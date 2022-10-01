import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

const apolloUtility = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: new HttpLink({ uri: "http://localhost:8443/graphql", fetch }),
});

export {apolloUtility}