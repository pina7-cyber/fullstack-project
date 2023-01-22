import { Routes, Route } from "react-router-dom"
import React from "react"
import { useState, useEffect } from "react"
import Home from "./components/Home"
import Topics from "./components/Topics"
import NavBar from "./components/NavBar"
import Topic from "./components/Topic"
import CssBaseline from "@mui/material/CssBaseline"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_TOPICS } from "./queries"
import { ALL_USERS } from "./queries"
import { LOGIN } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { useColorMode } from "./theme"

const App = () => {
  const theme = useTheme()
  const colorMode = useColorMode()
  const topics = useQuery(ALL_TOPICS)
  const users = useQuery(ALL_USERS)
  const [token, setToken] = useState(null)

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log("error"),
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('topixx-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (topics.loading) {
    return <div>loading...</div>
  }
  if (users.loading) {
    return <div>loading...</div>
  }

  return (
    <>
      <CssBaseline />

      <NavBar theme={theme} colorMode={colorMode} />

      <Routes>
        <Route
          path='/topics'
          element={<Topics topics={topics.data.allTopics} />}
        />
        <Route
          path='/topics/:id'
          element={<Topic topics={topics.data.allTopics} />}
        />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
