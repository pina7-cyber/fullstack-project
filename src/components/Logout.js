import { IconButton } from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"
import Backdrop from "@mui/material/Backdrop"
import { useState } from "react"
import CircularProgress from "@mui/material/CircularProgress"

const Logout = () => {
  const [open, setOpen] = useState(false)
  const localToken = window.localStorage.getItem("topixx-user-token")

  const handleLogout = (event) => {
    console.log("logout")
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleToggle = () => {
    setOpen(!open)
  }

  if (localToken) {
    console.log("logout")
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
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default Logout
