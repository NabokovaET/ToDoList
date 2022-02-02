import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ApolloProvider} from '@apollo/client';
import './index.scss';
import App from './App';
import store from './store';
import client from './client'

ReactDOM.render(
   <BrowserRouter>
      <React.StrictMode>
         <ApolloProvider client={client} >
            <Provider store={store}>
               <App />
            </Provider>
         </ApolloProvider>
      </React.StrictMode>
   </BrowserRouter>,
  document.getElementById('root')
);

