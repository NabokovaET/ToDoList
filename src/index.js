import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import store from './store';

ReactDOM.render(
   <BrowserRouter>
      <React.StrictMode>
         <Provider store={store}>
            <App />
         </Provider>
      </React.StrictMode>
   </BrowserRouter>,
  document.getElementById('root')
);

