import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "http://localhost:3000",
  cache: new InMemoryCache(),
});

export default client;
