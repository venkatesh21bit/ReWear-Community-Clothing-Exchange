"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Recycle, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginStatus, setLoginStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginStatus(null)

    console.log("Login attempt:", { email, password })

    try {
      await login(email, password)
      setLoginStatus({ type: "success", message: "Login successful!" })

      setTimeout(() => {
        router.push("/") // Redirect to home page to see logged-in state
      }, 500)
    } catch (error: any) {
      setLoginStatus({ type: "error", message: error.message || "Login failed" })
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/5 to-blue-500/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md mx-auto p-4 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">ReWear</span>
          </Link>
        </div>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-transparent bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text">Welcome Back</CardTitle>
            <CardDescription className="text-white/70">Sign in to your account to continue swapping</CardDescription>
          </CardHeader>
          <CardContent>
            {loginStatus && (
              <div
                className={`p-3 rounded-lg text-center text-sm mb-4 ${
                  loginStatus.type === "success" ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                }`}
              >
                {loginStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-emerald-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-emerald-300 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-emerald-500/20"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-white/50" />
                    ) : (
                      <Eye className="h-4 w-4 text-white/50" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-emerald-300 border-white/20 rounded focus:ring-emerald-500 bg-white/10"
                  />
                  <Label htmlFor="remember" className="text-sm text-white/70">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-emerald-300 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 hover:scale-105" disabled={isLoggingIn}>
                {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoggingIn ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="bg-white/20 my-4" />
              <div className="text-center">
                <span className="text-sm text-white/70">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-emerald-300 hover:underline font-medium">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-white/50">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-emerald-300 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-emerald-300 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}