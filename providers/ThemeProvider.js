import { useState, useContext, useMemo } from "react"

import { ThemeContext, themes } from "context/ThemeContext"

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light)

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark)
  }

  // with useMemo means if the theme and toggleTheme does not then themeAPI will not be reexecuted
  const themeAPI = useMemo(() => {
    return {
      theme,
      toggleTheme,
    }
  }, [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={themeAPI}>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)
