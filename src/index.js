import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Reducers/Index';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

<React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <App />
  <ToastContainer/>
 </BrowserRouter>
 </Provider>
  </React.StrictMode>
);

