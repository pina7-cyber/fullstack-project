import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Topics from "./components/Topics"
import NavBar from "./components/NavBar"

const App = () => {
  return (
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
  )
}

export default App
