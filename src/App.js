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
      <NavBar
        setNotification={notification.setNotification}
        theme={theme}
        colorMode={colorMode}
        setToken={setToken}
        clearToken={clearToken}
        getUser={getUser}
        resetLoginTimeout={resetLoginTimeout}
      />
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='stretch'
        style={{ height: "100vh", width: "100vw" }}
      >
        <Notification
          message={notification.message}
          removeNotification={notification.removeNotification}
        />
        {/* <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        style={{ height: "100vh", width: "100vw" }}
      > */}
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
      </Grid>

      <Footer />
    </>
  )
}

export default App
