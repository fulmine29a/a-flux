import React, {useCallback} from 'react';
import {useCounterContext} from "./counterContext";

/*
* проверка работы на большом количестве действий
*
* ⚠ открытая консоль при включённой отладки может существенно убить быстродействие.
* лучше либо закрыть консоль либо убрать отладку.
* */
export const CounterMany = () => {
  const {store} = useCounterContext();

  const execute = useCallback(
    () => {
      for (let i = 0; i < 1000; i++) {
        store.actions.add();
      }
    },
    [store]
  )

  return <button onClick={execute}>Бахнуть много экшенов!!!</button>
}
