import React, { useCallback } from 'react';
import { useCounterContext } from './counterContext';
import { useSelector } from 'a-flux-react';
import { selectCounter } from './store/selectors';

export const Counter = () => {
  const { store } = useCounterContext();

  const counter = useSelector(store, selectCounter);

  const add = useCallback(
    () => store.actions.add(),
    [store]
  );

  const dec = useCallback(
    () => store.actions.dec(),
    [store]
  );

  return (
    <div>
      <button onClick={dec}>-</button>
      <span> {counter} </span>
      <button onClick={add}>+</button>
    </div>
  );
};
