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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const menuItems = [
    { Name: "Logout", Icon: <LogoutOutlinedIcon />, onClick: { logout } },
  ]

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton size='large' onClick={handleOpenNavMenu} color='inherit'>
        <PersonOutlineOutlinedIcon />
      </IconButton>
      <Menu
        id='menu-appbar'
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
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.Name} onClick={handleCloseNavMenu}>
            <ListItemIcon onClick={item.onClick}>{item.Icon}</ListItemIcon>
            <ListItemText>{item.Name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default Logout
