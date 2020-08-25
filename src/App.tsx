import React from 'react';
import './App.css';
import { Step } from './components/counter/Step';
import {Counter} from "./components/counter/Counter";

function App() {
  return (
    <div className="App">
      <Step />
      <Counter />
    </div>
  );
}

export default App;
