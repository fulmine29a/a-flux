import {createStore} from "./createStore";
import {DeepReadonly} from "deep-freeze";

export interface AfluxState extends Object {
}

export interface AfluxReducersTemplate<State> {
  [k: string]: (state: DeepReadonly<State>, payload?: any) => State,
}

export type AfluxStore = ReturnType<typeof createStore>

export interface AfluxActionsTemplate<State, Reducers> {
  [k:string]: (store:{state: DeepReadonly<State>, reducers:Reducers, actions: AfluxActions<State, Reducers, AfluxActionsTemplate<State, Reducers>>}, payload?: any) => (void | Promise<any>)
}

export type AfluxReducers<State, ReducerTemplate extends AfluxReducersTemplate<State>> = {[k in keyof ReducerTemplate]: (payload?: Parameters<ReducerTemplate[k]>[1]) => void};
export type AfluxActions<State, Reducers, ActionTemplate extends AfluxActionsTemplate<State, Reducers>> = {[k in keyof ActionTemplate]: (payload?: Parameters<ActionTemplate[k]>[1]) => Promise<void>};

