import { IconButton } from "@mui/material"
//import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"

const Logout = ({ logout }) => {
  return (
    <IconButton color='inherit'>
      <PersonOutlineOutlinedIcon onClick={logout} />
    </IconButton>
  )
}

export default Logout
