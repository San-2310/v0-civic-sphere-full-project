"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Map, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // In a real app, you would authenticate with your backend here
      // For now, we'll simulate a successful login with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if we have valid dummy credentials
      if (formData.email === "citizen@example.com" && formData.password === "password") {
        localStorage.setItem("userRole", "citizen")
        router.push("/dashboard")
      } else if (formData.email === "officer@example.com" && formData.password === "password") {
        localStorage.setItem("userRole", "officer")
        router.push("/dashboard")
      } else if (formData.email === "admin@example.com" && formData.password === "password") {
        localStorage.setItem("userRole", "admin")
        router.push("/dashboard")
      } else {
        setError("Invalid credentials. Try citizen@example.com / password")
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="bg-orange-100 dark:bg-orange-950 w-12 h-12 rounded-full flex items-center justify-center">
              <Map className="h-6 w-6 text-orange-500" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Login to CivicSphere</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access the platform</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-muted-foreground hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Demo accounts:
              <ul className="list-disc list-inside mt-1">
                <li>citizen@example.com / password</li>
                <li>officer@example.com / password</li>
                <li>admin@example.com / password</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-orange-500 hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
