# Ещё один флакс...

при выполнении  тестового задания ставил своей целью не "починить флакс", а скорее исправить те неудобства с которыми я столкнулся при работе с подобной архитектурой. К примеру сократил количество бойлерплейта и обеспечил типизацию стора.

воспроизводится решение предназначенное для работы с несколькими сторами т.к. в задаче указано _"реализация Flux"_, а не _"реализация Redux"_.  

### Меню

##### библиотека стора
- [Реализация стора](a-flux/createStore.ts)
- [Работа с подписчиками](a-flux/subscribes.ts)
- [Очередь отложенный заданий](a-flux/tasks.ts)
- [Реализация useSelector](a-flux-react/useSelector.ts)

##### реализация стора в приложении

- [Пример стора](example/src/components/counter/store/index.ts)
- [Пример редуцеров](example/src/components/counter/store/reducers.ts)
- [Пример действий](example/src/components/counter/store/actions.ts)

##### визуальные компоненты приложения

- [Компонент использующий счётчик (приложение)](example/src/App.tsx)
- <[CounterProvider](example/src/components/counter/CounterProvider.tsx)>
- <[CounterStep](example/src/components/counter/CounterStep.tsx)>
- <[Counter](example/src/components/counter/Counter.tsx)>
- <[CounterAsync](example/src/components/counter/CounterAsync.tsx)>
- <[CounterMany](example/src/components/counter/CounterMany.tsx)>
