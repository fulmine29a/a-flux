import {CounterState} from "./state";
import {CounterReducers} from "./index";

type actionStoreInfo = {
  state: CounterState,
  reducers: CounterReducers,
}

export const counterActions = {
  add({reducers}:actionStoreInfo){
    reducers.ADD_COUNTER();
  },
}
