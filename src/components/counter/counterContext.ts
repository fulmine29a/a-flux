import React, {useContext} from "react";
import {createCounterStore} from "./store";

type counterContextData = {
  store: ReturnType<typeof createCounterStore>
} | null

export const counterContext = React.createContext(null as counterContextData);

export const useCounterContext = () => {
  const context = useContext(counterContext);

  if (!context) {
    throw new Error("компоненты использующие контекст счётчика должна быть обёрнуты в соответствующий провайдер");
  }

  return context;
}
