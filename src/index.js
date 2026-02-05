import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast'; // Changed this
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Reducers/Index';
import SocketManager from './SocketManager';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketManager /> 
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);