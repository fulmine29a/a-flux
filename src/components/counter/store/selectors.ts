import {CounterState} from "./state";

export const selectCounter = (state: CounterState) => state.counter
export const selectStep = (state: CounterState) => state.stepSize
