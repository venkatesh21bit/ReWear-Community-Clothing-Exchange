"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Recycle, User, Settings, LogOut, Plus, Sparkles, Zap, Globe } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function MainHeader() {
  const { user, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/" // Redirect to home page
  }

  return (
    <header className="border-b border-white/10 bg-black/90 backdrop-blur-xl sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Recycle className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              ReWear
            </span>
            <Badge className="px-2 py-1 bg-emerald-500/20 border-emerald-400/30 text-emerald-300 text-xs">
              AI
            </Badge>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/browse" className="text-white/70 hover:text-emerald-300 transition-all duration-300 font-medium relative group">
            <Globe className="w-4 h-4 inline mr-2 group-hover:rotate-45 transition-transform duration-300" />
            Browse Items
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="/how-it-works" className="text-white/70 hover:text-purple-300 transition-all duration-300 font-medium relative group">
            <Sparkles className="w-4 h-4 inline mr-2 group-hover:animate-spin" />
            How It Works
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="/about" className="text-white/70 hover:text-blue-300 transition-all duration-300 font-medium relative group">
            <Zap className="w-4 h-4 inline mr-2 group-hover:animate-bounce" />
            About
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 group-hover:w-full transition-all duration-300"></div>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button asChild className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 group">
                <Link href="/add-item">
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  List Item
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 transition-all duration-300 hover:scale-105 group">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-purple-600 text-white font-bold">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-black/90 animate-pulse"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-2" align="end" forceMount>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-purple-600/10 border border-white/5 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-purple-600 text-white font-bold">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-semibold text-white">{user?.name}</p>
                      <p className="text-sm text-white/60 truncate max-w-[150px]">{user?.email}</p>
                      <Badge className="mt-1 w-fit px-2 py-0.5 bg-emerald-500/20 border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                        {user?.points} points
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenuItem asChild className="rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group">
                    <Link href="/dashboard" className="flex items-center p-3">
                      <User className="mr-3 h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-white font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group">
                    <Link href="/settings" className="flex items-center p-3">
                      <Settings className="mr-3 h-4 w-4 text-purple-400 group-hover:rotate-90 transition-transform duration-200" />
                      <span className="text-white font-medium">Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <div className="h-px bg-white/10 my-2"></div>
                  <DropdownMenuItem onClick={handleLogout} className="rounded-xl hover:bg-red-500/10 hover:border-red-400/20 transition-all duration-200 cursor-pointer group p-3">
                    <LogOut className="mr-3 h-4 w-4 text-red-400 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-red-300 font-medium">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-emerald-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-emerald-400/30 rounded-xl px-6 py-2 font-semibold transition-all duration-300 hover:scale-105">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 group">
                  <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
