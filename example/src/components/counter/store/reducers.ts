import {CounterState} from "./state";

/*
* редуцеры
*
* вместо привычной TYPE константы - просто используем ключ в объекте
* */
export const counterReducers = {
  ADD_COUNTER: (state: CounterState): CounterState => ({...state, counter: state.counter + state.stepSize}),
  DEC_COUNTER: (state: CounterState): CounterState => ({...state, counter: state.counter - state.stepSize}),
  SET_STEP: (state: CounterState, value: number | string): CounterState => state.stepSize == value ? state : ({
    ...state,
    stepSize: Number(value)
  }),
  SHOW_LOADER: (state: CounterState): CounterState => state.load ? state : ({...state, load: true}),
  HIDE_LOADER: (state: CounterState): CounterState => state.load ? ({...state, load: false}) : state,
};
