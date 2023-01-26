import { useState, useEffect } from "react"
import { USER } from "../queries"
import { useQuery } from "@apollo/client"

export const useIsFilled = (props) => {
  const [values, setValues] = useState(props)

  const fill = (prop, value) => {
    setValues({ ...values, [prop]: value })
  }
  const full = () => {
    let counter = 0

    Object.entries(values).map((value) => (value[1] === "" ? null : counter++))

    if (counter === Object.entries(values).length) {
      return true
    } else {
      return false
    }
  }

  return {
    values,
    fill,
    full,
  }
}

export const useNotification = () => {
  const [message, setMessage] = useState({
    content: "",
    severity: "",
    available: false,
  })

  const setNotification = (content, severity) => {
    setMessage({
      content: content,
      severity: severity,
      available: true,
    })
    setTimeout(() => {
      setMessage({
        content: "",
        severity: "",
        available: false,
      })
    }, 5000)
  }

  const removeNotification = () => {
    setMessage({
      content: "",
      severity: "",
      available: false,
    })
  }

  return {
    message,
    setNotification,
    removeNotification,
  }
}

export const useAuth = () => {
  const [timeoutID, setTimeoutID] = useState(null)

  const [values, setValues] = useState({
    token: null,
    name: null,
    username: null,
  })
  const user = useQuery(USER, {
    variables: { search: values.token ? values.token.search : null },
  })

  useEffect(() => {
    console.log("effect")
    if (values.token && user.data) {
      console.log(user.data)
      setValues({
        token: values.token,
        name: user.data.me.name ? user.data.me.name : null,
        username: user.data.me.username,
      })
    }
  }, [values.token, user.data])

  const setToken = (token) => {
    localStorage.setItem("topixx-user-token", token)
    setValues({
      ...values,
      token: token,
    })
    const timeoutID = setTimeout(clearToken, 20000)
    setTimeoutID(timeoutID)
    console.log("setToken timeoutID", timeoutID)
  }

  const clearToken = () => {
    localStorage.clear()
    setValues({
      name: null,
      username: null,
      token: null,
    })
    clearTimeout(timeoutID)
  }

  const getUser = (value) => {
    if (!value) {
      console.log("getuser")
      return values
    }
    if (value === "token" && !user.loading) {
      console.log("getuser-token")
      return values.token
    }
    if (value === "username") {
      console.log("getuser-username")
      return values.username
    }
    if (value === "name") {
      console.log("getuser-name")
      return values.name
    }
  }

  const resetLoginTimeout = () => {
    if (timeoutID && getUser("token")) {
      clearTimeout(timeoutID)
      const newTimeoutID = setTimeout(clearToken, 5000)
      setTimeoutID(newTimeoutID)
    }
  }

  return {
    setToken,
    clearToken,
    resetLoginTimeout,
    getUser,
  }
}
