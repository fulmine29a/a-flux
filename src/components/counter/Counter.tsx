import React, {useContext} from 'react';
import { counterContext } from './counterContext';

export const Counter = () => {
  // const counter = useSelector(state => state.counter)
  // const dispatch = useDispatch()
  const {store} = useContext(counterContext);

  const {counter} = store ? store.getState() : {counter: 0};

  return (
    <div>
      <button onClick={() => 1}>-</button>
      <span> {counter} </span>
      <button onClick={() => store && store.reducers.ADD_COUNTER()}>+</button>
    </div>
  )
}
