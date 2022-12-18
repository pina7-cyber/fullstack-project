import ReactDOM from "react-dom/client"
import App from "./App"
import React from "react"
import ToggleColorMode from "./theme"
import { BrowserRouter as Router } from "react-router-dom"

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <ToggleColorMode>
      <Router>
        <App />
      </Router>
    </ToggleColorMode>
  </ApolloProvider>
)
