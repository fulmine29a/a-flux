import React from "react";
import {createCounterStore} from "./store";

type counterContextData = {
  store: ReturnType<typeof createCounterStore> | null
}
const emptyContext:counterContextData = {store: null};

export const counterContext = React.createContext(emptyContext);
