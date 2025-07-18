"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Recycle, Eye, EyeOff, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { authAPI } from "@/lib/api"

export default function SignupPage() {
  const router = useRouter()
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [signupStatus, setSignupStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigningUp(true)
    setSignupStatus(null)

    console.log("Signup attempt:", formData)

    if (formData.password !== formData.confirmPassword) {
      setSignupStatus({ type: "error", message: "Passwords do not match" })
      setIsSigningUp(false)
      return
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setSignupStatus({ type: "error", message: "All fields are required" })
      setIsSigningUp(false)
      return
    }

    try {
      await authAPI.signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      })
      setSignupStatus({ type: "success", message: "Signup successful! Redirecting to login..." })
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setTimeout(() => {
        router.push("/login")
      }, 1000)
    } catch (error: any) {
      setSignupStatus({ type: "error", message: error.message || "Signup failed" })
    } finally {
      setIsSigningUp(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
            <CardTitle className="text-2xl text-transparent bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text">Join ReWear</CardTitle>
            <CardDescription className="text-white/70">Create your account and start your sustainable fashion journey</CardDescription>
          </CardHeader>
          <CardContent>
            {signupStatus && (
              <div
                className={`p-3 rounded-lg text-center text-sm mb-4 ${
                  signupStatus.type === "success" ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                }`}
              >
                {signupStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-emerald-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-emerald-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-emerald-300 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-emerald-500/20"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-white/50" />
                    ) : (
                      <Eye className="h-4 w-4 text-white/50" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="text-xs text-white/70 space-y-1">
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-emerald-300" />
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-emerald-300" />
                  <span>Contains uppercase and lowercase letters</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-emerald-300 border-white/20 rounded focus:ring-emerald-500 bg-white/10"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-white/70">
                  I agree to the{" "}
                  <Link href="/terms" className="text-emerald-300 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-emerald-300 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 hover:scale-105" disabled={isSigningUp}>
                {isSigningUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSigningUp ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="bg-white/20 my-4" />
              <div className="text-center">
                <span className="text-sm text-white/70">
                  Already have an account?{" "}
                  <Link href="/login" className="text-emerald-300 hover:underline font-medium">
                    Sign in
                  </Link>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}