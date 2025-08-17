"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize with false and only check localStorage on the client side
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if the user is already logged in on initial load - only runs on client
  useEffect(() => {
    const authStatus = localStorage.getItem("predimtech_auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  // Simple login function with hardcoded credentials
  const login = async (username: string, password: string) => {
    if (username === "Pradeep" && password === "20000") {
      setIsAuthenticated(true)
      // Only set localStorage on the client
      if (typeof window !== "undefined") {
        localStorage.setItem("predimtech_auth", "authenticated")
      }
      return { success: true, message: "Login successful" }
    }

    return { success: false, message: "Invalid credentials" }
  }

  // Logout function
  const logout = () => {
    setIsAuthenticated(false)
    // Only remove from localStorage on the client
    if (typeof window !== "undefined") {
      localStorage.removeItem("predimtech_auth")
    }
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

