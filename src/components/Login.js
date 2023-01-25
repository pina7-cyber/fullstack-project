import { IconButton } from "@mui/material"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import Backdrop from "@mui/material/Backdrop"
import { useState, useEffect } from "react"
import LoginForm from "./LoginForm"
import { useApolloClient } from "@apollo/client"
import Logout from "./Logout"

const Login = ({ setNotification }) => {
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const localToken = window.localStorage.getItem("topixx-user-token")
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  const handleLogout = (event) => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setNotification("successfully logged out", "success")
  }

  const handleClose = () => setOpen(false)
  const handleToggle = () => setOpen(!open)

  if (token) {
    return <Logout logout={handleLogout} />
  }

  return (
    <div>
      <IconButton color='inherit' onClick={handleToggle}>
        <LoginOutlinedIcon />
      </IconButton>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <LoginForm
          handleClose={handleClose}
          setToken={setToken}
          setNotification={setNotification}
        />
      </Backdrop>
    </div>
  )
}

export default Login
