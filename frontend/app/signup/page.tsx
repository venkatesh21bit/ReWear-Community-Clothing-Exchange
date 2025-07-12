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

// Add import for useRouter and Loader2 icon
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { authAPI } from "@/lib/api"

export default function SignupPage() {
  // Inside SignupPage component, add router instance and loading/status states
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

  // Update handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigningUp(true)
    setSignupStatus(null)

    console.log("Signup attempt:", formData)

    // Basic validation (can be expanded)
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
      // Clear form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setTimeout(() => {
        router.push("/login") // Redirect to login page after signup
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-green-800">ReWear</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join ReWear</CardTitle>
            <CardDescription>Create your account and start your sustainable fashion journey</CardDescription>
          </CardHeader>
          <CardContent>
            {signupStatus && (
              <div
                className={`p-3 rounded-lg text-center text-sm mb-4 ${
                  signupStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {signupStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-500" />
                  <span>Contains uppercase and lowercase letters</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  required
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-green-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-green-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSigningUp}>
                {isSigningUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSigningUp ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-green-600 hover:underline font-medium">
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
