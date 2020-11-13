import React from 'react';
import { hot } from 'react-hot-loader/root';
import ReactDOM from 'react-dom';
// import { createBrowserHistory } from 'history';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
hot(App);

ReactDOM.render(
  // 严格模式
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
