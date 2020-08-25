import {createStore} from "./createStore";
import {DeepReadonly} from "deep-freeze";

export interface AfluxState extends Object {
}

export interface AfluxReducers<State> {
  [k: string]: (state: DeepReadonly<State>, payload?: any) => State,
}

export type AfluxStore = ReturnType<typeof createStore>
