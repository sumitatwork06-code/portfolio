"use client"

import * as React from "react"

export type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [theme, setThemeState] = React.useState<Theme>("light")

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio-theme") as Theme | null
      if (stored === "dark" || stored === "light") {
        setThemeState(stored)
        applyTheme(stored)
      } else {
        const hour = new Date().getHours()
        const isNight = hour >= 18 || hour < 6
        const initial = isNight ? "dark" : "light"
        setThemeState(initial)
        applyTheme(initial)
      }
    } catch {
      // Ignore localStorage access failures
    }
  }, [])

  const applyTheme = (next: Theme) => {
    const root = document.documentElement
    if (next === "dark") {
      root.classList.add("dark")
      root.setAttribute("data-theme", "dark")
    } else {
      root.classList.remove("dark")
      root.setAttribute("data-theme", "light")
    }
  }

  const setTheme = (next: Theme) => {
    setThemeState(next)
    applyTheme(next)
    try {
      localStorage.setItem("portfolio-theme", next)
    } catch {
      // Ignore localStorage write failures
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  return React.useContext(ThemeContext)
}
