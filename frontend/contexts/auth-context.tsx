"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { User, authAPI, userAPI } from "@/lib/api"

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in and fetch user data on mount
    const initAuth = async () => {
      const token = localStorage.getItem("access_token")
      if (token) {
        try {
          const userData = await userAPI.getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error("Failed to fetch user data:", error)
          // Clear invalid token
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password)
    if (response.success && response.user) {
      setUser(response.user)
    }
  }

  const logout = () => {
    setUser(null)
    authAPI.logout()
  }

  const refreshUser = async () => {
    try {
      const userData = await userAPI.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error("Failed to refresh user data:", error)
      logout()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
