import React, {ReactNode, useState} from 'react';
import {counterContext} from './counterContext';
import {createCounterStore} from "./store";

/*
* обертка для хранения контекста,
* лежит не в "библиотеке" т.к. решение как передавать стор должно быть в "пользовательском коде"
* */
export function CounterProvider({children}: { children: ReactNode }) {
  const [contextData] = useState(() => ({store: createCounterStore()}));

  return <counterContext.Provider value={contextData}>
    {children}
  </counterContext.Provider>
}
