import {useEffect, useState} from 'react';
import {AfluxStore} from "../a-flux";

export function useSelector<R, T extends AfluxStore, State = ReturnType<T['getState']>>(store: T, selector: (state: State) => R): R {
  const [value, setValue] = useState(selector(store.getState() as State));

  useEffect(
    () => {
      return store.subscribe(() => {
        setValue(selector(store.getState() as State))
      });
    },
    [store, selector]
  )

  return value;
}
