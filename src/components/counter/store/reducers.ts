import {CounterState} from "./state";

export const counterReducers = {
  ADD_COUNTER: (state:CounterState):CounterState => ({...state ,counter: state.counter + state.stepSize})
};
