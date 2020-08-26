# Ещё один флакс...

при выполнении  тестового задания ставил своей целью не "починить флакс", а скорее исправить те неудобства с которыми я столкнулся при работе с подобной архитектурой. К примеру сократил количество бойлерплейта и обеспечил типизацию стора.

воспроизводится решение предназначенное для работы с несколькими сторами т.к. в задаче указано _"реализация Flux"_, а не _"реализация Redux"_.  

### Меню

##### библиотека стора
- [Реализация стора](src/a-flux/createStore.ts)
- [Работа с подписчиками](src/a-flux/subscribes.ts)
- [Очередь отложенный заданий](src/a-flux/tasks.ts)
- [Реализация useSelector](src/a-flux-react/useSelector.ts)

##### реализация стора в приложении
- [Пример стора](src/components/counter/store/index.ts)
- [Пример редуцеров](src/components/counter/store/reducers.ts)
- [Пример действий](src/components/counter/store/actions.ts)

##### визуальные компоненты приложения
- [Компонент использующий счётчик (приложение)](src/App.tsx)
- <[CounterProvider](src/components/counter/CounterProvider.tsx)>
- <[CounterStep](src/components/counter/CounterStep.tsx)>
- <[Counter](src/components/counter/Counter.tsx)>
