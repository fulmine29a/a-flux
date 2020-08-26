/***
 * стор для компонентов счётчика,
 * умышленно лежит внутри папки компонентов т.к. :
 * - при переиспользовании в другой проект проще скопировать одну папку
 * - когда начинаешь работать с группой компонентов приходится ещё куда-то лазить и искать стор, а так всё под рукой
 */

import {AfluxActions, AfluxReducers, createStore} from "../../../a-flux";
import {counterInitialState, CounterState} from "./state";
import {counterReducers} from "./reducers";
import {counterActions} from "./actions";

let count = 0;

export const createCounterStore = () => createStore(
  counterInitialState,
  counterReducers,
  counterActions,
  `counterStore-${++count}`,
  true,
);

export type ReadOnlyCounterState = ReturnType<ReturnType<typeof createCounterStore>['getState']>
export type CounterReducers = AfluxReducers<CounterState, typeof counterReducers>

export interface CounterActions extends AfluxActions<CounterState, CounterReducers, typeof counterActions> {
}
