import React, { useCallback } from 'react';
import { useSelector } from 'a-flux-react';
import { selectLoad } from './store/selectors';
import { useCounterContext } from './counterContext';

/*
* Проверка работы асинхронного экшена, и возможности показа лоадера во время него
*
* во время "загрузки" стор должен принимать действия, но будет откладывать их выполнение до завершения текущего.
*
* P.S. поведение приложения в момент "загрузки" может показаться странным (типа подвисло), однако в живой приложухе элементы ввода
* на время загрузки буду заблокированы. тут они оставлены работающими специально для проверки очереди
* */
export const CounterAsync = () => {
  const { store } = useCounterContext();
  const load = useSelector(store, selectLoad);

  const asyncAdd = useCallback(
    () => {
      store.actions.asyncAdd();
    },
    [store]
  );

  return (
    <div>
      <p>{load ? 'loading' : 'ready'}</p>
      <button onClick={asyncAdd}>Асинхронное добавление</button>
    </div>
  );
};
