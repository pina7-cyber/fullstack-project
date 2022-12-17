import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Topics from "./components/Topics"
import NavBar from "./components/NavBar"
import CssBaseline from "@mui/material/CssBaseline"

const App = () => {
  return (
    <div>
      <CssBaseline />
      <div>
        <div>
          <NavBar />
        </div>
        <div>
          <Routes>
            <Route path='/topics' element={<Topics />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
