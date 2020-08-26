import React, {MouseEventHandler} from 'react';
import {useCounterContext} from './counterContext';
import {useSelector} from "../../a-flux";
import {selectCounter} from "./store/selectors";

export const Counter = () => {
  const {store} = useCounterContext();

  const counter = useSelector(store, selectCounter);

  return (
    <div>
      <button onClick={store.actions.dec as unknown as MouseEventHandler}>-</button>
      <span> {counter} </span>
      <button onClick={store.actions.add as unknown as MouseEventHandler}>+</button>
    </div>
  )
}
