import { useState, useEffect } from "react"
import { USER } from "../queries"
import { useQuery } from "@apollo/client"
import { useApolloClient } from "@apollo/client"

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

  const client = useApolloClient()

  useEffect(() => {
    if (values.token && user.data) {
      if (user.data.me) {
        setValues({
          token: values.token,
          name: user.data.me.name ? user.data.me.name : null,
          username: user.data.me.username,
        })
      }
    }
  }, [values.token, user.data])

  useEffect(() => {
    const localToken = localStorage.getItem("topixx-user-token")
    if (localToken) {
      setToken(localToken)
    }
  }, []) // eslint-disable-line

  const setToken = (token) => {
    localStorage.setItem("topixx-user-token", token)
    setValues({
      ...values,
      token: token,
    })
    const timeoutID = setTimeout(clearToken, 5000)
    setTimeoutID(timeoutID)
    client.resetStore()
  }

  const clearToken = () => {
    localStorage.clear()
    setValues({
      name: null,
      username: null,
      token: null,
    })
    clearTimeout(timeoutID)
    setTimeoutID(null)
    client.resetStore()
  }

  const getUser = (value) => {
    if (!value) {
      return values
    }
    if (value === "token" && !user.loading) {
      return values.token
    }
    if (value === "username") {
      return values.username
    }
    if (value === "name") {
      return values.name
    }
  }

  const resetLoginTimeout = () => {
    console.log("timeoutID old", timeoutID)
    if (timeoutID && getUser("token")) {
      clearTimeout(timeoutID)
      const newTimeoutID = setTimeout(clearToken, 5000)
      setTimeoutID(newTimeoutID)
    }
  }

  console.log("timeoutID new", timeoutID)

  return {
    setToken,
    clearToken,
    resetLoginTimeout,
    getUser,
  }
}
