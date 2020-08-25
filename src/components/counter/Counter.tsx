import React from 'react';

export const Counter = () => {
  // const counter = useSelector(state => state.counter)
  // const dispatch = useDispatch()

  const counter = 1

  return (
    <div>
      <button onClick={() => 1}>-</button>
      <span> {counter} </span>
      <button onClick={() => 1}>+</button>
    </div>
  )
}
