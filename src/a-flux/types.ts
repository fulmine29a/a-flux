import {createStore} from "./createStore";
import {DeepReadonly} from "deep-freeze";

export interface AfluxState extends Object {
}

/**
 * шаблон редуцеров подаваемый на вход функции создания стора
 * */
export interface AfluxReducersTemplate<State> {
  [k: string]: (state: DeepReadonly<State>, payload?: any) => State,
}

/*
* примерный тип стора, реальный тип лучше получить по возвращаемому типу функции создания стора, так будут работать подсказки в ide
* */
export type AfluxStore = ReturnType<typeof createStore>

/*
* шаблон действий передаваемый в функцию создания стора
* */
export interface AfluxActionsTemplate<State, Reducers, T> {
  [k: string]: (store: { state: DeepReadonly<State>, reducers: Reducers, actions: { [k2 in keyof T]: (payload?: any) => Promise<void> } }, payload?: any) => (void | Promise<any>)
}

/*
* шаблоны для получения реального типа действий и редуцеров
* */
export type AfluxReducers<State, ReducerTemplate extends AfluxReducersTemplate<State>> = { [k in keyof ReducerTemplate]: (payload?: Parameters<ReducerTemplate[k]>[1]) => void };
export type AfluxActions<State, Reducers, ActionTemplate extends { [n: string]: (arg1: any, arg2?: any) => any }> = { [k in keyof ActionTemplate]: Parameters<ActionTemplate[k]>[1] extends undefined ? () => Promise<void> : (payload: Parameters<ActionTemplate[k]>[1]) => Promise<void> };

