import { IconButton } from "@mui/material"
import { useState } from "react"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import Divider from "@mui/material/Divider"

const Logout = ({ setNotification, clearToken, getUser }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleLogout = (event) => {
    console.log("logout")
    clearToken()
    setNotification("successfully logged out", "success")
  }

  const handleOpenMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorElNav(null)
  }

  const name = getUser("username")
    ? getUser("name")
      ? getUser("name")
      : getUser("username")
    : null

  const menuItems = [
    {
      Name: name ? name : "My Account",
      Icon: <PersonOutlineOutlinedIcon />,
      onClick: null,
    },
  ]

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
      <IconButton size='large' onClick={handleOpenMenu} color='inherit'>
        <PersonOutlineOutlinedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseMenu}
        sx={{
          display: { xs: "block" },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.Name} onClick={item.onClick}>
            <ListItemIcon>{item.Icon}</ListItemIcon>
            <ListItemText>{item.Name}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Logout
