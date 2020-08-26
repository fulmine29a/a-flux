/*
  начальное состояние и одновременно шаблон состояния
* */
export const counterInitialState = {
  counter: 1,
  stepSize: 1,
  load: false,
};

export type CounterState = typeof counterInitialState;
