import React from 'react';
import {useCounterContext} from './counterContext';
import {useSelector} from "../../a-flux";
import {selectCounter} from "./store/selectors";

export const Counter = () => {
  const {store} = useCounterContext();

  const counter = useSelector(store, selectCounter);

  return (
    <div>
      <button onClick={() => 1}>-</button>
      <span> {counter} </span>
      <button onClick={() => store.actions.add()}>+</button>
    </div>
  )
}
