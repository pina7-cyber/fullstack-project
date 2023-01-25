import { IconButton } from "@mui/material"
import { useState } from "react"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"

const Logout = ({ logout }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorElNav(null)
  }

  const menuItems = [
    { Name: "Logout", Icon: <LogoutOutlinedIcon />, onClick: logout },
  ]

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
          display: { xs: "block", md: "none" },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.Name} onClick={item.onClick}>
            <ListItemIcon>{item.Icon}</ListItemIcon>
            <ListItemText>{item.Name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default Logout
