import React from 'react';
import './App.css';
import {CounterStep} from './components/counter/CounterStep';
import {Counter} from "./components/counter/Counter";
import {CounterProvider} from "./components/counter/CounterProvider";

function App() {
  return (
    <div className="App">
      <CounterProvider>
        <CounterStep/>
        <Counter/>
      </CounterProvider>
    </div>
  );
}

export default App;
