"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Recycle, User, Settings, LogOut, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function MainHeader() {
  const { user, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/" // Redirect to home page
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">ReWear</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/browse" className="text-gray-600 hover:text-green-600 transition-colors">
            Browse Items
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
            How It Works
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/add-item">
                  <Plus className="w-4 h-4 mr-2" />
                  List Item
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                      <p className="text-sm text-green-600 font-medium">{user?.points} points</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-green-600">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
