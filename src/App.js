import { Routes, Route } from "react-router-dom"
import React from "react"
import Home from "./components/Home"
import Topics from "./components/Topics"
import NavBar from "./components/NavBar"
import Topic from "./components/Topic"
import Notification from "./components/Notification"
import CssBaseline from "@mui/material/CssBaseline"
import { useQuery } from "@apollo/client"
import { ALL_TOPICS } from "./queries"
import { ALL_USERS } from "./queries"
import { useNotification } from "./hooks"
import { useTheme } from "@mui/material/styles"
import { useColorMode } from "./theme"
import { useAuth } from "./hooks/index"
import Footer from "./components/Footer"
import Grid from "@mui/material/Grid"

const App = () => {
  const theme = useTheme()
  const colorMode = useColorMode()
  const topics = useQuery(ALL_TOPICS)
  const users = useQuery(ALL_USERS)
  const notification = useNotification()
  const auth = useAuth()
  const setToken = auth.setToken
  const clearToken = auth.clearToken
  const getUser = auth.getUser
  const resetLoginTimeout = auth.resetLoginTimeout

  if (topics.loading) {
    return <div>loading...</div>
  }
  if (users.loading) {
    return <div>loading...</div>
  }

  return (
    <>
      <CssBaseline />
      <Grid
        container
        direction='column'
        justifyContent='space-between'
        alignItems='stretch'
        style={{ height: "100vh", width: "100vw" }}
      >
        <NavBar
          setNotification={notification.setNotification}
          theme={theme}
          colorMode={colorMode}
          setToken={setToken}
          clearToken={clearToken}
          getUser={getUser}
          resetLoginTimeout={resetLoginTimeout}
        />
        <Notification
          message={notification.message}
          removeNotification={notification.removeNotification}
        />

        <Routes>
          <Route
            path='/topics'
            element={
              <Topics
                topics={topics.data.allTopics}
                resetLoginTimeout={resetLoginTimeout}
              />
            }
          />
          <Route
            path='/topics/:id'
            element={
              <Topic
                topics={topics.data.allTopics}
                resetLoginTimeout={resetLoginTimeout}
              />
            }
          />
          <Route path='/' element={<Home />} />
        </Routes>

        <Footer />
      </Grid>
    </>
  )
}

export default App
