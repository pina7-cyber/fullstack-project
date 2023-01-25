import ReactDOM from "react-dom/client"
import App from "./App"
import React from "react"
import ToggleColorMode from "./theme"
import { BrowserRouter as Router } from "react-router-dom"
import { setContext } from "@apollo/client/link/context"

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("topixx-user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})

const httpLink = new HttpLink({ uri: "http://localhost:4000" })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
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
