/***
 * стор для компонентов счётчика,
 * умышленно лежит внутри папки компонентов т.к. :
 * - при переиспользовании в другой проект проще скопировать одну папку
 * - когда начинаешь работать с группой компонентов приходится ещё куда-то лазить и искать стор, а так всё под рукой
 */

import { createStore } from "../../../a-flux";
import { counterInitialState } from "./state";
import { counterReducers } from "./reducers";

export const counterStore = createStore(
  counterInitialState,
  counterReducers,
  'counterStore',
  true,
);