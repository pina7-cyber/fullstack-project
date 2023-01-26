import { useState, useEffect } from "react"

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
  const [token, setTok] = useState(null)
  const [timeoutID, setTimeoutID] = useState(null)

  useEffect(() => {
    const localToken = window.localStorage.getItem("topixx-user-token")
    if (localToken) {
      setTok(localToken)
    }
  }, [token])

  console.log(timeoutID)
  console.log(token)

  const setToken = (token) => {
    localStorage.setItem("topixx-user-token", token)
    const timeoutID = setTimeout(clearToken, 5000)
    setTimeoutID(timeoutID)
  }

  const clearToken = () => {
    //localStorage.clear()
    setTok(null)
  }

  const getToken = () => window.localStorage.getItem("topixx-user-token")

  const resetLoginTimeout = () => {
    if (timeoutID && getToken()) {
      clearTimeout(timeoutID)
      const newTimeoutID = setTimeout(clearToken, 5000)
      setTimeoutID(newTimeoutID)
    }
  }

  return {
    setToken,
    clearToken,
    token,
    resetLoginTimeout,
    getToken,
  }
}
