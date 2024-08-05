import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";

import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import "./index.css";
import client from "./apollo/client.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
