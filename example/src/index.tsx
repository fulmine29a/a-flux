import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    root: HTMLDivElement
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  // eslint-disable-next-line node/no-deprecated-api
  window.root
);
