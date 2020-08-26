import {AfluxActions, AfluxActionsTemplate, AfluxReducers, AfluxReducersTemplate, AfluxState} from "./types";
import {createSubscribeNode} from "./subscribes";
import deepFreeze from 'deep-freeze';

// список всех сторов для возможности реализации девтула
// @ts-ignore
global.storeList = [];

/***
 * создание стора
 */
export function createStore<
    State extends AfluxState,
    ReducerTemplate extends AfluxReducersTemplate<State>,
    ActionTemplate extends AfluxActionsTemplate<State, Reducers>,
    Reducers = AfluxReducers<State, ReducerTemplate>,
    Actions = AfluxActions<State, Reducers, ActionTemplate>,
  >(initialState: State, reducersTemplate: ReducerTemplate, actionsTemplate: ActionTemplate, storeName = '', debug = false) {
  /*
   начальное состояние инициализируем тут, а не прогоняя редуцер впустую.

   в редакс использование начального стейта как значения по умолчанию имеет сл. причины:
   - при сборке одного огромного стора из кучи редуцеров это делает сборку стора более простым (вот редуцер и вот его стейт)
   - при отсутствии типизации это даёт подсказку для IDE какие данные в state
   - эдакий файл-сейф если всё обнулиться
   ...возможно что-то ещё до чего я не додумался...

   у нас же:
   - имеем несколько разных сторов, а значит начальное состояние конкретному стору можно просто указать
     при создании, т.к. отпадает необходимость во вложенных сторах (нужен "подстор" - просто делаем новый стор)
   - типизация у нас явная
  */

  // текущее состояние стора, замораживаем, предварительно скопировав т.к. фриз морозит свой параметр и возвращает его, а не создаёт новый
  let currentState = deepFreeze({...initialState});

  /*
    получение состояния стора.
  */
  const getState = () => currentState;

  // создаём узел подписки

  const {emit, subscribe} = createSubscribeNode();

  /*
    формируем преобразователи (редуцеры).

    типичная структура написания редуцеров в редакс мне не нравится:
    - сначала объявляем константы, потом пишем километровый свитч и путаемся в переменных если они вдруг понадобились.
    - сложность в описании типов параметров редуцеров передаваемых через dispatch порождает необходимость
      в ещё в одной сущности actionCreator-ы, которые мало того что надо описывать, так и ещё и сбивают
      с толку при попытке понять их назначение. actionCreator по началу кажется местом для бизнес логики,
      только вот какая она без асинхроности и нескольких преобразований(показать лоадер, что-то положить в стор, убрать лоадер)?
      всё что может actionCreator - это быть способом типизации преобразований.
    - встаёт проблема объяснить IDE что же мы там можем передать в type у dispatch.

    в нашем случае кладём все редуцеры в один объект, ключ - по сути TYPE нужного преобразования и получаем:
    ---
    - все возможные типы преобразований указаны явно, в итоговом объекте подсказки IDE работают, просто жмём точку
      и видим что может вызвать. и для этого даже не нужно выдумывать плагины для шторма... всё с коробки
    - параметры и их типы так же проброшены для IDE и typescript
    - DRY!!!
  */
  const reducers = Object.fromEntries(
    Object.entries(reducersTemplate).map(
      ([type, reducer]) =>
        [type, (payload?:any) => {
          const newState = reducer(currentState, payload)
          const changed = newState != currentState;

          if(debug){
            /*
              тут по идее должна быть отправка данных преобразования в девтул, записи данных для "машины времени" и хот-релоада...
              для демонстрации ограничимся выводом в консоль
            */

            console.table(
              {
                storeName,
                TYPE: type,
                PAYLOAD: payload,
                changed,
                new: newState,
                old: currentState,
              },
            )
          }

          // начинаем обновление только если стейт действительно изменился
          if(changed) {
            //для предупреждения случайной мутации замораживаем стейт
            currentState = deepFreeze(newState);

            emit();
          }
        }]
    )
  ) as unknown as Reducers;

  /*
    действия, сразу с поддержкой асинхроности и получением стейта. редуцеры получают как параметры
  */
  const actions = Object.fromEntries(
    Object.entries(actionsTemplate).map(
      ([actionName, action]) =>
        /* для действии используем асинхронную функцию, тем самым код который вызвал действие сможет узнать что оно законченно */
        [actionName, async (payload?: any) => {
          if(debug){
            console.group(`ACTION: ${actionName}, store: ${storeName || 'unknown'}`)
            console.groupCollapsed('Вызванно из')
            console.trace();
            console.groupEnd();
          }

          await action({state: currentState, reducers}, payload);

          if(debug){
            console.groupEnd()
          }
        }]
    )
  ) as unknown as Actions;

  /*
    стор видимый для внешнего кода.

    умышленно скрыты редуцеры. доступ к ним возможен только из действии. да обязательность написания действии кажется
    лишней писаниной, но лишь до того момента когда выясняется что на какое-то изменение надо ещё что-то прикрутить
    и начинается беготня по коду задним числом что бы заменить всё на действие.
  * */
  const store = {
    getState,
    storeName,
    subscribe,
    actions
  };

  if(debug){
    // @ts-ignore
    global.storeList.push(store);
  }

  return store;
}
