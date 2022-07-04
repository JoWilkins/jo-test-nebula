import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import QlikProvider from './context/QlikProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // causes x2 render
  <QlikProvider>
    <App />
  </QlikProvider>
  // </React.StrictMode>
);
