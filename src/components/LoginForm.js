import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"
import { CREATE_USER } from "../queries"
import { useApolloClient } from "@apollo/client"
import IconButton from "@mui/material/IconButton"
import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Grid, Paper, Typography, Button } from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useIsFilled } from "../hooks/index"

const LoginForm = (props) => {
  const client = useApolloClient()

  const [Login, loginResult] = useMutation(LOGIN, {
    onError: (error) => {
      props.setNotification(error.graphQLErrors[0].message, "error")
    },
  })

  const [CreateUser, userResult] = useMutation(CREATE_USER, {
    onError: (error) => {
      props.setNotification(error.graphQLErrors[0].message, "error")
    },
  })

  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value
      props.setToken(token)
      localStorage.setItem("topixx-user-token", token)
      client.resetStore()
    }
  }, [loginResult.data]) // eslint-disable-line

  const [values, setValues] = useState({
    password: "",
    username: "",
    name: "",
    showPassword: false,
  })
  const [shadow, setShadow] = useState(12)
  const [isLogin, setisLogin] = useState(true)
  const isFilled = useIsFilled({
    password: "",
    username: "",
  })

  const handleChange = (prop) => (event) => {
    isFilled.fill(prop, event.target.value)
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isLogin === true) {
      const loginData = {
        username: values.username,
        password: values.password,
      }
      Login({ variables: loginData })
      setValues({
        username: "",
        password: "",
        showPassword: false,
      })
      isFilled.fill("username", "")
      isFilled.fill("password", "")
    } else if (isLogin === false) {
      console.log("signup")
      console.log(values.name)
      const signupData = !values.name.replace(/\s/g, "").length //string only contains whitespace (ie. empty, spaces, tabs or line breaks)
        ? {
            username: values.username,
            password: values.password,
          }
        : {
            username: values.username,
            password: values.password,
            name: values.name,
          }
      CreateUser({ variables: signupData })
      setValues({
        username: "",
        password: "",
        name: "",
        showPassword: false,
      })
      isFilled.fill("username", "")
      isFilled.fill("password", "")
    }
    props.handleClose()
  }

  const formHeight = () => (isLogin ? "400px" : "500px")

  return (
    <Grid
      sx={{
        minHeight: "100vh",
        display: "flex",
      }}
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Grid
        item
        sx={{ flexGrow: 1 }}
        container
        justifyContent='center'
        alignItems='center'
      >
        <Paper
          component={"div"}
          onClick={(e) => {
            e.stopPropagation()
          }}
          elevation={shadow}
          onMouseOver={() => setShadow(24)}
          onMouseOut={() => setShadow(12)}
          sx={{
            height: formHeight,
          }}
        >
          <Grid
            container
            sx={{ height: formHeight }}
            direction='column'
            component={"form"}
            onSubmit={handleSubmit}
            justifyContent='space-evenly'
            alignItems='center'
          >
            <Grid item>
              <Typography variant='h5'>
                {isLogin ? `Login` : "Signup"}
              </Typography>
            </Grid>
            {isLogin === false && (
              <Grid item>
                <FormControl sx={{ m: 2, width: "25ch" }} variant='standard'>
                  <InputLabel htmlFor='standard-adornment-password'>
                    Name
                  </InputLabel>
                  <Input
                    id='name'
                    type='text'
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <FormControl sx={{ m: 2, width: "25ch" }} variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  Username
                </InputLabel>
                <Input
                  id='username'
                  type='text'
                  value={values.username}
                  onChange={handleChange("username")}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ m: 2, width: "25ch" }} variant='standard'>
                <InputLabel htmlFor='standard-adornment-password'>
                  Password
                </InputLabel>
                <Input
                  id='standard-adornment-password'
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                endIcon={isLogin ? <LoginIcon /> : <ArrowForwardIosIcon />}
                disabled={!isFilled.full()}
                type='submit'
              >
                {isLogin ? "login" : "Sign up"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                endIcon={isLogin ? null : <LoginIcon />}
                onClick={() => setisLogin(!isLogin)}
              >
                <Typography variant='caption'>
                  {isLogin ? `Don't have an account? ` : "Have an account? "}
                  {isLogin && <b>Sign up!</b>}
                  {!isLogin && <b>Log in!</b>}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default LoginForm
