import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
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
 
 export default client;