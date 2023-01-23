import { IconButton } from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import Backdrop from "@mui/material/Backdrop"
import { useState, useEffect } from "react"
import LoginForm from "./LoginForm"
import { useApolloClient } from "@apollo/client"

const Logout = () => {
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState(null)
  console.log(open)
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
  }

  const handleClose = () => setOpen(false)
  const handleToggle = () => setOpen(!open)

  if (token) {
    return (
      <IconButton color='inherit' onClick={handleLogout}>
        <LogoutOutlinedIcon />
      </IconButton>
    )
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
        <LoginForm handleClose={handleClose} setToken={setToken} />
      </Backdrop>
    </div>
  )
}

export default Logout
