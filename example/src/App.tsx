import React from 'react';
import './App.css';
import { CounterStep } from './components/counter/CounterStep';
import { Counter } from './components/counter/Counter';
import { CounterProvider } from './components/counter/CounterProvider';
import { CounterAsync } from './components/counter/CounterAsync';
import { CounterMany } from './components/counter/CounterMany';

function App () {
  return (
    <div className="App">
      <CounterProvider>
        <CounterStep/>
        <Counter/>
        <CounterAsync/>
        <CounterMany/>
      </CounterProvider>
    </div>
  );
}

export default App;
