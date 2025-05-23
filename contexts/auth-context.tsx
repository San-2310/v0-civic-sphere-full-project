"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type UserRole = "citizen" | "officer" | "admin" | null

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem("userRole") as UserRole

    if (userRole) {
      // Simulate user data based on role
      const userData: User = {
        id: "123456",
        name: userRole === "citizen" ? "John Citizen" : userRole === "officer" ? "Officer Smith" : "Admin Kumar",
        email: `${userRole}@example.com`,
        role: userRole,
        avatar: `/placeholder.svg?height=40&width=40`,
      }
      setUser(userData)
    }

    setIsLoading(false)

    // Redirect if needed
    const publicPaths = ["/", "/login", "/register", "/forgot-password"]
    const isPublicPath = publicPaths.some((path) => pathname === path)

    if (!userRole && !isPublicPath) {
      router.push("/login")
    } else if (userRole && (pathname === "/login" || pathname === "/register")) {
      router.push("/dashboard")
    }
  }, [pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would be your API login logic
      if (email === "citizen@example.com" && password === "password") {
        const userData: User = {
          id: "c123",
          name: "John Citizen",
          email: "citizen@example.com",
          role: "citizen",
          avatar: "/placeholder.svg?height=40&width=40",
        }
        setUser(userData)
        localStorage.setItem("userRole", "citizen")
        router.push("/dashboard")
      } else if (email === "officer@example.com" && password === "password") {
        const userData: User = {
          id: "o456",
          name: "Officer Smith",
          email: "officer@example.com",
          role: "officer",
          avatar: "/placeholder.svg?height=40&width=40",
        }
        setUser(userData)
        localStorage.setItem("userRole", "officer")
        router.push("/dashboard")
      } else if (email === "admin@example.com" && password === "password") {
        const userData: User = {
          id: "a789",
          name: "Admin Kumar",
          email: "admin@example.com",
          role: "admin",
          avatar: "/placeholder.svg?height=40&width=40",
        }
        setUser(userData)
        localStorage.setItem("userRole", "admin")
        router.push("/dashboard")
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  const register = async (userData: any) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would be your API registration logic
      const newUser: User = {
        id: "new123",
        name: userData.name,
        email: userData.email,
        role: userData.userType as UserRole,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(newUser)
      localStorage.setItem("userRole", userData.userType)
      router.push("/dashboard")
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
