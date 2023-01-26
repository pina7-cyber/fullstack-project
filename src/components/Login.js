import { IconButton } from "@mui/material"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import Backdrop from "@mui/material/Backdrop"
import { useState } from "react"
import LoginForm from "./LoginForm"
import { useApolloClient } from "@apollo/client"
import Logout from "./Logout"

const Login = ({ setNotification, setToken, getUser, clearToken }) => {
  const [open, setOpen] = useState(false)

  const client = useApolloClient()

  const handleLogout = (event) => {
    console.log("logout")
    clearToken()
    client.resetStore()
    setNotification("successfully logged out", "success")
  }

  const handleClose = () => setOpen(false)
  const handleToggle = () => setOpen(!open)

  if (getUser("token")) {
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
