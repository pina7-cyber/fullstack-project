import { IconButton } from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"

const Logout = () => {
  const localToken = window.localStorage.getItem("topixx-user-token")

  const handleLogout = (event) => {
    console.log("logout or in")
  }

  if (localToken) {
    return (
      <IconButton color='inherit' onClick={handleLogout}>
        <LogoutOutlinedIcon />
      </IconButton>
    )
  }
  return (
    <IconButton color='inherit' onClick={handleLogout}>
      <LoginOutlinedIcon />
    </IconButton>
  )
}

export default Logout
