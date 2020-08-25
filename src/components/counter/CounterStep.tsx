import React from 'react';

export const CounterStep = () => {
  // const stepSize = useSelector(state => state.stepSize, (current, prev) => current === prev)
  // const dispatch = useDispatch()

 const stepSize = 1;

  return (
    <div>
      <div>Значение счётчика должно увеличиваться или уменьшаться на заданную величину шага</div>
      <div>Текущая величина шага: {stepSize}</div>
      <input
        type="range"
        min="1"
        max="5"
        value={stepSize}
        onChange={({ target }) => target.value}
      />
    </div>
  )
}
