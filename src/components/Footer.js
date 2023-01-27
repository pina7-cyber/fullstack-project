import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"

const Copyright = () => {
  const navigate = useNavigate()

  return (
    <Typography variant='body2' color='text.secondary'>
      {"Copyright © "}
      <Link
        underline='hover'
        color='inherit'
        component='button'
        onClick={() => {
          navigate(`/`)
        }}
      >
        Topixx
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth='sm'>
        <Typography variant='body2'>Description.</Typography>
        <Copyright />
      </Container>
    </Box>
  )
}

export default Footer
