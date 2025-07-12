import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Recycle } from "lucide-react"

export function MainHeader() {
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
          <Link href="/login">
            <Button variant="ghost" className="text-green-600">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
