import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import './index.scss';
import App from './App';
import store from './store/store'
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
   const token = localStorage.getItem('token');
   return {
     headers: {
       ...headers,
       authorization: token ? `Bearer ${token}` : "",
     }
   }
 });

const link = from([
   new HttpLink({uri: 'http://localhost:1234/graphql'})
]);

const client = new ApolloClient ({
   link: authLink.concat(link),
   cache: new InMemoryCache(),
});

ReactDOM.render(
   <BrowserRouter>
      <React.StrictMode>
         <ApolloProvider client={client}>
            <Provider store={store}>
               <App />
            </Provider>
         </ApolloProvider>
      </React.StrictMode>
   </BrowserRouter>,
  document.getElementById('root')
);

