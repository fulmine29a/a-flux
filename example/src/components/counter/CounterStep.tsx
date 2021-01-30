import React, { useCallback } from 'react';
import { useCounterContext } from './counterContext';
import { useSelector } from 'a-flux-react';
import { selectStep } from './store/selectors';

export const CounterStep = () => {
  const { store } = useCounterContext();
  const stepSize = useSelector(store, selectStep);

  const onChange = useCallback(
    ({ target }) => {
      store.actions.setStep(target.value);
    },
    [store]
  );

  return (
    <div>
      <div>Значение счётчика должно увеличиваться или уменьшаться на заданную величину шага</div>
      <div>Текущая величина шага: {stepSize}</div>
      <input
        type="range"
        min="1"
        max="5"
        value={stepSize}
        onChange={onChange}
      />
    </div>
  );
};
