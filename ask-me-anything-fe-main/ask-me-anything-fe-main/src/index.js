import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './Redux/reducers';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(rootReducer, applyMiddleware(thunk));

// const store = configureStore(rootReducer,applyMiddleware(thunk));

root.render(
  <Provider store={store}>
<React.StrictMode>
     <BrowserRouter>
    <App />
     </BrowserRouter>
  </React.StrictMode>
  </Provider>
  
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
