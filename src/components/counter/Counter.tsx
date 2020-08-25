import React from 'react';
import {useCounterContext} from './counterContext';
import {useSelector} from "../../a-flux/useSelector";
import {selectCounter} from "./store/selectors";

export const Counter = () => {
  // const counter = useSelector(state => state.counter)
  // const dispatch = useDispatch()
  const {store} = useCounterContext();

  const [counter] = useSelector(store, selectCounter);

  return (
    <div>
      <button onClick={() => 1}>-</button>
      <span> {counter} </span>
      <button onClick={() => store && store.reducers.ADD_COUNTER()}>+</button>
    </div>
  )
}
