import { IconButton } from "@mui/material"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

const Logout = () => {
  const handleLogout = (event) => {
    console.log("logout")
  }

  return (
    <IconButton color='inherit' onClick={handleLogout}>
      <LogoutOutlinedIcon />
    </IconButton>
  )
}

export default Logout
