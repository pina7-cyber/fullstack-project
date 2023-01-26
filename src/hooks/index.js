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

  const user = useQuery(USER)

  const [values, setValues] = useState({
    token: null,
    name: null,
    username: null,
  })

  useEffect(() => {
    const localToken = window.localStorage.getItem("topixx-user-token")
    if (localToken && !user.loading) {
      setValues({
        token: localToken,
        name: user.data.me.name,
        username: user.data.me.username,
      })
    }
  }, [values, user])

  const setToken = (token) => {
    localStorage.setItem("topixx-user-token", token)
    const timeoutID = setTimeout(clearToken, 5000)
    setTimeoutID(timeoutID)
  }

  const clearToken = () => {
    localStorage.clear()
    setValues({
      ...values,
      token: null,
    })
  }

  const getUser = (value) => {
    const localToken = window.localStorage.getItem("topixx-user-token")
    setValues({
      ...values,
      token: localToken,
    })
    if (value === "token") {
      return localToken
    }
    if (value === "username") {
      return values.username
    }
    if (value === "name") {
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
