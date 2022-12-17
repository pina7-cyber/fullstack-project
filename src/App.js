import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Topics from "./components/Topics"
import NavBar from "./components/NavBar"
import Topic from "./components/Topic"
import CssBaseline from "@mui/material/CssBaseline"
import { useQuery } from "@apollo/client"
import { ALL_TOPICS } from "./queries"
import { ALL_USERS } from "./queries"

const App = () => {
  const topics = useQuery(ALL_TOPICS)
  const users = useQuery(ALL_USERS)

  if (topics.loading) {
    return <div>loading...</div>
  }
  if (users.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <CssBaseline />
      <div>
        <div>
          <NavBar />
        </div>
        <div>
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
        </div>
      </div>
    </div>
  )
}

export default App
