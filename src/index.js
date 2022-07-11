import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import QlikProvider from './context/QlikProvider';

ReactDOM.render(
  <QlikProvider>
    <App />
  </QlikProvider>,
  document.getElementById('root')
);
