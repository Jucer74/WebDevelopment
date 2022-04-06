import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const element = <App />

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(element)