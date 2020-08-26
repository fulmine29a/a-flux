import {CounterState} from "./state";
import {CounterActions, CounterReducers} from "./index";

type actionStoreInfo = {
  state: CounterState,
  reducers: CounterReducers,
  actions: CounterActions,
}

/*
  действия.

  в шторме по CTRL+B на редуцере можно попасть в конкретный редуцер сразу. работает проверка параметров редуцера.
* */
export const counterActions = {
  add({reducers}: actionStoreInfo) {
    reducers.ADD_COUNTER();
  },
  dec({reducers}: actionStoreInfo) {
    reducers.DEC_COUNTER();
  },
  setStep({reducers}: actionStoreInfo, value: number | string) {
    reducers.SET_STEP(value);
  }
}
