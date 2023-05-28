import React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

export default function ToggleColorMode(props) {
  const [mode, setMode] = React.useState("light")
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#482271" : "#271010",
          },
          secondary: {
            main: mode === "light" ? "#482271" : "#271010",
          },
          background: {
            default: mode === "light" ? "#ffe4e4" : "#271010",
            paper: mode === "light" ? "#ffe4e4" : "#271010",
          },
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export const useColorMode = () => React.useContext(ColorModeContext)
