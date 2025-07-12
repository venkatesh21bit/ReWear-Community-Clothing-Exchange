"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, Users, ArrowRight, Star, Heart, ChevronLeft, ChevronRight, Plus, Package } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"

export default function LandingPage() {
  const { user, isLoggedIn } = useAuth()
  const [currentSlide, setCurrentSlide] = useState(0)

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Excellent",
      points: 150,
      usdPrice: 75,
      category: "Outerwear",
      likes: 24,
    },
    {
      id: 2,
      title: "Designer Summer Dress",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Like New",
      points: 200,
      usdPrice: 100,
      category: "Dresses",
      likes: 18,
    },
    {
      id: 3,
      title: "Classic White Sneakers",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Good",
      points: 120,
      usdPrice: 60,
      category: "Shoes",
      likes: 31,
    },
    {
      id: 4,
      title: "Wool Winter Coat",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Very Good",
      points: 180,
      usdPrice: 90,
      category: "Outerwear",
      likes: 15,
    },
    {
      id: 5,
      title: "Silk Blouse",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Excellent",
      points: 130,
      usdPrice: 65,
      category: "Tops",
      likes: 22,
    },
    {
      id: 6,
      title: "Leather Ankle Boots",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Good",
      points: 140,
      usdPrice: 70,
      category: "Shoes",
      likes: 27,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredItems.length / 4))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredItems.length / 4)) % Math.ceil(featuredItems.length / 4))
  }

  const getVisibleItems = () => {
    const itemsPerSlide = 4
    const startIndex = currentSlide * itemsPerSlide
    return featuredItems.slice(startIndex, startIndex + itemsPerSlide)
  }

  if (isLoggedIn) {
    // Logged-in user view
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Welcome Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Welcome back, <span className="text-green-600">{user?.name?.split(" ")[0]}!</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Ready to continue your sustainable fashion journey? You have{" "}
                <span className="font-semibold text-green-600">{user?.points} points</span> to spend.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/browse">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                    <Package className="mr-2 w-5 h-5" />
                    Start Swapping
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-3 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    Browse Items
                  </Button>
                </Link>
                <Link href="/add-item">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-3 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Plus className="mr-2 w-5 h-5" />
                    List an Item
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{user?.points}</div>
                  <div className="text-gray-600">Your Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                  <div className="text-gray-600">Items Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                  <div className="text-gray-600">Successful Swaps</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Continue Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Keep Listing</h3>
                <p className="text-gray-600">Turn your unused clothes into points and help others find great pieces</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Discover More</h3>
                <p className="text-gray-600">Browse new arrivals and find your next favorite sustainable piece</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Make Impact</h3>
                <p className="text-gray-600">Every swap reduces waste and supports sustainable fashion</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Items Carousel */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                  className="w-10 h-10 p-0 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
                  className="w-10 h-10 p-0 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Link href="/browse">
                  <Button
                    variant="outline"
                    className="ml-4 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    View All Items
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleItems().map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Badge className="absolute top-2 left-2 bg-green-600">{item.condition}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>{item.category}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{item.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-semibold text-green-600">${item.usdPrice}</span>
                          <span className="text-xs text-gray-500">{item.points} points</span>
                        </div>
                        <Link href={`/item/${item.id}`}>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            View Item
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(featuredItems.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Next Swap?</h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              With {user?.points} points available, you can find amazing sustainable fashion pieces right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
                  Browse Items Now
                </Button>
              </Link>
              <Link href="/add-item">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3 bg-transparent"
                >
                  <Plus className="mr-2 w-5 h-5" />
                  List New Item
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Recycle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold">ReWear</span>
                </div>
                <p className="text-gray-400">Making fashion sustainable, one swap at a time.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/browse" className="hover:text-white transition-colors">
                      Browse Items
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-it-works" className="hover:text-white transition-colors">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:text-white transition-colors">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/help" className="hover:text-white transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="hover:text-white transition-colors">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="hover:text-white transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/press" className="hover:text-white transition-colors">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 ReWear. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Non-logged-in user view (original landing page)
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Sustainable Fashion
              <span className="text-green-600 block">Starts Here</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of fashion lovers exchanging clothes, reducing waste, and building a more sustainable
              wardrobe together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                  Start Swapping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  Browse Items
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
                <div className="text-gray-600">Items Exchanged</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">5K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">2.5T</div>
                <div className="text-gray-600">CO₂ Saved (lbs)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How ReWear Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Items</h3>
              <p className="text-gray-600">Upload photos and details of clothes you no longer wear</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Swap</h3>
              <p className="text-gray-600">Find items you love and propose swaps with other users</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Earn & Redeem</h3>
              <p className="text-gray-600">Earn points for successful swaps and redeem for items you want</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
            <Link href="/browse">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
                View All Items
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.slice(0, 4).map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Badge className="absolute top-2 left-2 bg-green-600">{item.condition}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{item.category}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-600">{item.points} points</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        View Item
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Wardrobe?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of sustainable fashion enthusiasts and start making a positive impact today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
                Get Started Free
              </Button>
            </Link>
            <Link href="/add-item">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3 bg-transparent"
              >
                List an Item
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">ReWear</span>
              </div>
              <p className="text-gray-400">Making fashion sustainable, one swap at a time.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white transition-colors">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
