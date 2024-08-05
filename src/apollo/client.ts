import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const isProduction = process.env.NODE_ENV === "production";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: isProduction
    ? process.env.REACT_APP_GRAPHQL_URI
    : "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;
