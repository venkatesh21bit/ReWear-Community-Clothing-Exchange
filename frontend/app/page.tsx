"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, Users, ArrowRight, Star, Heart, ChevronLeft, ChevronRight, Plus, Package, Sparkles, Zap, Globe, Award, TrendingUp, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { itemsAPI, Item } from "@/lib/api"

export default function LandingPage() {
  const { user, isLoggedIn } = useAuth()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [featuredItems, setFeaturedItems] = useState<Item[]>([])
  const [isLoadingItems, setIsLoadingItems] = useState(true)

  // Mouse tracking for premium effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Fetch featured items (using recent high-rated items as featured)
  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        setIsLoadingItems(true)
        // Get items with no filters to get the latest items as "featured"
        const response = await itemsAPI.getAllItems()
        if (response.success) {
          // Take first 6 items as featured items
          setFeaturedItems(response.results.slice(0, 6))
        }
      } catch (error) {
        console.error('Failed to fetch featured items:', error)
        // Keep featured items empty if API fails
        setFeaturedItems([])
      } finally {
        setIsLoadingItems(false)
      }
    }

    fetchFeaturedItems()
  }, [])

  const nextSlide = () => {
    if (featuredItems.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredItems.length / 3))
    }
  }

  const prevSlide = () => {
    if (featuredItems.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredItems.length / 3)) % Math.ceil(featuredItems.length / 3))
    }
  }

  const getVisibleItems = () => {
    const itemsPerSlide = 4
    const startIndex = currentSlide * itemsPerSlide
    return featuredItems.slice(startIndex, startIndex + itemsPerSlide)
  }

  if (isLoggedIn) {
    // Premium logged-in user view
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/5 to-blue-500/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Premium Welcome Section */}
        <section className="relative py-32 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-6xl mx-auto">
              {/* Welcome Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 group hover:bg-white/20 transition-all duration-500">
                <Award className="w-4 h-4 text-emerald-400 group-hover:animate-spin" />
                <span className="text-sm font-medium text-emerald-300">Welcome Back, Eco Warrior!</span>
                <Sparkles className="w-4 h-4 text-yellow-400 group-hover:animate-bounce" />
              </div>

              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
                <span className="text-white">Hello,</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  {user?.first_name}!
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
                Ready to continue your{" "}
                <span className="text-emerald-400 font-semibold">sustainable fashion</span> journey?
                <br />
                You have{" "}
                <span className="text-purple-400 font-bold text-3xl">{user?.points_balance}</span>{" "}
                <span className="text-blue-400 font-semibold">points</span> to spend.
              </p>

              {/* Premium Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link href="/browse">
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white border-0 text-lg px-12 py-6 rounded-2xl shadow-2xl shadow-emerald-500/25 transition-all duration-500 hover:shadow-emerald-500/40 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Package className="mr-3 w-6 h-6 group-hover:animate-spin" />
                    Start Swapping
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 text-lg px-12 py-6 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-white/25 hover:scale-105"
                  >
                    <Globe className="mr-3 w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
                    Browse Items
                  </Button>
                </Link>
                <Link href="/add-item">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 text-lg px-12 py-6 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-white/25 hover:scale-105"
                  >
                    <Plus className="mr-3 w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                    List an Item
                  </Button>
                </Link>
              </div>

              {/* Premium Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { number: user?.points_balance || 0, label: "Your Points", icon: Award, color: "emerald" },
                  { number: user?.items_listed || 0, label: "Items Listed", icon: Package, color: "purple" },
                  { number: user?.completed_swaps || 0, label: "Successful Swaps", icon: TrendingUp, color: "blue" }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="group relative p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/30"
                    style={{
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <stat.icon className={`w-12 h-12 text-${stat.color}-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`} />
                    <div className={`text-4xl font-bold text-${stat.color}-400 mb-2`}>{stat.number}</div>
                    <div className="text-white/70 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Premium Featured Items Carousel */}
        <section className="relative py-32 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                  <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                    Featured
                  </span>{" "}
                  Items
                </h2>
                <p className="text-xl text-white/70">Discover premium pieces from our community</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={prevSlide}
                  className="w-14 h-14 p-0 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-2xl group transition-all duration-300"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={nextSlide}
                  className="w-14 h-14 p-0 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-2xl group transition-all duration-300"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Link href="/browse">
                  <Button
                    size="lg"
                    className="ml-4 bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white border-0 px-8 py-4 rounded-2xl shadow-2xl shadow-emerald-500/25 transition-all duration-500 hover:shadow-emerald-500/40 hover:scale-105 group"
                  >
                    View All Items
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Premium Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                {isLoadingItems ? (
                  <div className="flex items-center justify-center py-32">
                    <div className="text-center">
                      <Package className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-white/70">Loading featured items...</p>
                    </div>
                  </div>
                ) : featuredItems.length === 0 ? (
                  <div className="flex items-center justify-center py-32">
                    <div className="text-center">
                      <Package className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <p className="text-white/70">No featured items available</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: Math.ceil(featuredItems.length / 3) }).map((_, slideIdx) => (
                    <div
                      key={slideIdx}
                      className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
                    >
                      {featuredItems.slice(slideIdx * 3, slideIdx * 3 + 3).map((item, itemIdx) => (
                        <Card 
                          key={item.item_id} 
                          className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-3xl transition-all duration-700 hover:scale-105 hover:bg-white/10"
                          onMouseEnter={() => setHoveredCard(parseInt(item.item_id))}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          <CardContent className="p-0 relative">
                            <div className="relative overflow-hidden rounded-t-3xl">
                              <Image
                                src={item.primary_image || "/placeholder.svg"}
                                alt={item.title}
                                width={300}
                                height={300}
                                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              
                              {/* Floating Heart */}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-4 right-4 w-10 h-10 p-0 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                              >
                                <Heart className="w-4 h-4" />
                              </Button>

                              {/* Quick View Button */}
                              <Button
                                size="sm"
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white border-0 rounded-full px-6 shadow-2xl"
                              >
                                Quick View
                              </Button>
                            </div>
                            
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                                  {item.title}
                                </h3>
                                <Badge 
                                  variant="secondary" 
                                  className={`
                                    text-xs font-medium rounded-full px-2 py-1
                                    ${item.condition === "Excellent" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : 
                                      item.condition === "Like New" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : 
                                      item.condition === "Very Good" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : 
                                      "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"}
                                  `}
                                >
                                  {item.condition}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                  <div className="text-2xl font-bold text-emerald-400">
                                    {item.points_value} pts
                                  </div>
                                  <div className="text-sm text-white/50">
                                    ~${Math.round(item.points_value * 0.5)}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 text-white/60">
                                  <Heart className="w-4 h-4 text-red-400" />
                                  <span className="text-sm">{item.likes_count}</span>
                                </div>
                              </div>
                              
                              <Badge 
                                variant="outline" 
                                className="text-xs bg-white/5 text-white/70 border-white/20 hover:bg-white/10 transition-colors duration-300"
                              >
                                {item.category}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ))}
                </div>
                )}
              </div>
              
              {/* Carousel Indicators */}
              {!isLoadingItems && featuredItems.length > 0 && (
                <div className="flex justify-center mt-8 gap-2">
                  {Array.from({ length: Math.ceil(featuredItems.length / 3) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? "bg-gradient-to-r from-emerald-400 to-purple-400 shadow-lg shadow-emerald-400/50" 
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        
        {/* Premium Footer */}
        <footer className="relative bg-black/90 backdrop-blur-md border-t border-white/10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 backdrop-blur-md rounded-full border border-white/20 mb-8">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <span className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  ReWear
                </span>
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Building the future of sustainable fashion, one swap at a time.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Non-logged-in user view (premium hackathon-winning design)
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/5 to-blue-500/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Glassmorphism noise overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-6xl mx-auto">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 group hover:bg-white/20 transition-all duration-500">
              <Sparkles className="w-4 h-4 text-emerald-400 group-hover:animate-spin" />
              <span className="text-sm font-medium text-emerald-300">AI-Powered Sustainable Fashion</span>
              <Zap className="w-4 h-4 text-yellow-400 group-hover:animate-bounce" />
            </div>

            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                ReWear
              </span>
              <br />
              <span className="text-4xl md:text-6xl font-light text-white/80">
                The Future of Fashion
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the revolution in sustainable fashion with our{" "}
              <span className="text-emerald-400 font-semibold">AI-powered</span> clothing exchange platform.
              <br />
              Where every swap creates a{" "}
              <span className="text-purple-400 font-semibold">carbon-negative</span> impact.
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/signup">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white border-0 text-lg px-12 py-6 rounded-2xl shadow-2xl shadow-emerald-500/25 transition-all duration-500 hover:shadow-emerald-500/40 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Sparkles className="mr-3 w-6 h-6 group-hover:animate-spin" />
                  Start Your Journey
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="group bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 text-lg px-12 py-6 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-white/25 hover:scale-105"
                >
                  <Globe className="mr-3 w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
                  Explore Marketplace
                </Button>
              </Link>
            </div>

            {/* Premium Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: "50K+", label: "Carbon Offsets Created", icon: Leaf, color: "emerald" },
                { number: "25K+", label: "Fashion Enthusiasts", icon: Users, color: "purple" },
                { number: "1M+", label: "Items Rescued", icon: Recycle, color: "blue" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="group relative p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/30"
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <stat.icon className={`w-12 h-12 text-${stat.color}-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`} />
                  <div className={`text-4xl font-bold text-${stat.color}-400 mb-2`}>{stat.number}</div>
                  <div className="text-white/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Reimagined */}
      <section className="relative py-32 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-6 py-2 bg-purple-500/20 border-purple-400/30 text-purple-300 text-lg">
              Revolutionary Process
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              How Magic Happens
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our AI-powered platform makes sustainable fashion effortless, rewarding, and revolutionary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Listing",
                description: "Upload photos and let our AI automatically categorize, price, and optimize your listings for maximum visibility.",
                color: "emerald",
                delay: "0ms"
              },
              {
                icon: Zap,
                title: "Smart Matching",
                description: "Our algorithm instantly connects you with perfect swap partners based on style preferences and sustainability goals.",
                color: "purple",
                delay: "200ms"
              },
              {
                icon: Award,
                title: "Impact Rewards",
                description: "Earn carbon credits, unlock exclusive brands, and get rewarded for every sustainable choice you make.",
                color: "blue",
                delay: "400ms"
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="group relative text-center"
                style={{ animationDelay: step.delay }}
              >
                <div className="relative mb-8">
                  <div className={`w-32 h-32 mx-auto bg-gradient-to-br from-${step.color}-500/20 to-${step.color}-600/10 rounded-3xl border border-${step.color}-400/30 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-${step.color}-500/25`}>
                    <step.icon className={`w-16 h-16 text-${step.color}-400 group-hover:rotate-12 transition-transform duration-500`} />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${step.color}-500 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Featured Items Carousel */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-6 px-6 py-2 bg-emerald-500/20 border-emerald-400/30 text-emerald-300 text-lg">
              Trending Now
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Featured Collection
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
              Discover premium pieces curated by our AI and loved by our community
            </p>
            
            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="w-12 h-12 p-0 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-2xl transition-all duration-300 hover:scale-110"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="w-12 h-12 p-0 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-2xl transition-all duration-300 hover:scale-110"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Link href="/browse">
                <Button className="ml-4 bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white border-0 px-8 py-3 rounded-2xl shadow-2xl shadow-emerald-500/25 transition-all duration-500 hover:shadow-emerald-500/40 hover:scale-105">
                  Explore All Items
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Premium Carousel */}
          <div className="relative overflow-hidden rounded-3xl">
            {isLoadingItems ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <Package className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-white/70">Loading featured items...</p>
                </div>
              </div>
            ) : featuredItems.length === 0 ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <Package className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <p className="text-white/70">No featured items available</p>
                </div>
              </div>
            ) : (
              <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {Array.from({ length: Math.ceil(featuredItems.length / 3) }).map((_, slideIdx) => (
                <div key={slideIdx} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                  {featuredItems.slice(slideIdx * 3, slideIdx * 3 + 3).map((item, itemIdx) => (
                    <div
                      key={item.item_id}
                      className="group relative cursor-pointer"
                      onMouseEnter={() => setHoveredCard(parseInt(item.item_id))}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/30 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
                        <div className="relative overflow-hidden">
                          <Image
                            src={item.primary_image || "/placeholder.svg"}
                            alt={item.title}
                            width={400}
                            height={400}
                            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Floating Elements */}
                          <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/20">
                            <Heart className="w-5 h-5 text-white hover:text-red-400 transition-colors duration-300" />
                          </div>
                          
                          <Badge className={`absolute top-4 left-4 px-3 py-1 bg-emerald-500/80 backdrop-blur-sm border-emerald-400/30 text-white font-semibold`}>
                            {item.condition}
                          </Badge>

                          {/* Hover Content */}
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <Button className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-2xl transition-all duration-300">
                              <Sparkles className="w-4 h-4 mr-2" />
                              Quick View
                            </Button>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="border-white/30 text-white/70 bg-white/5">
                              {item.category}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-white/70 text-sm">{item.likes_count}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                            {item.title}
                          </h3>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold text-emerald-400">{item.points_value} pts</div>
                              <div className="text-sm text-white/50">${Math.round(item.points_value * 0.5)} value</div>
                            </div>
                            <Link href={`/item/${item.item_id}`}>
                              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                                View Item
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            )}
          </div>

          {/* Premium Carousel Indicators */}
          {!isLoadingItems && featuredItems.length > 0 && (
            <div className="flex justify-center mt-12 gap-3">
              {Array.from({ length: Math.ceil(featuredItems.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? "bg-emerald-400 shadow-lg shadow-emerald-400/50 scale-125" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-emerald-600/90 via-purple-600/80 to-blue-600/90">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-8 px-8 py-3 bg-white/20 backdrop-blur-md border-white/30 text-white text-lg font-semibold">
              Join the Revolution
            </Badge>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Transform
              </span>
              <br />
              Your Wardrobe?
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join our exclusive community of{" "}
              <span className="font-bold text-yellow-300">sustainable fashion pioneers</span> and start making a{" "}
              <span className="font-bold text-emerald-300">carbon-negative impact</span> today.
            </p>
            
            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/signup">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-white text-black hover:bg-white/90 text-xl px-16 py-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110 font-bold"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Sparkles className="mr-4 w-7 h-7 group-hover:animate-spin" />
                  Start Your Journey
                  <ArrowRight className="ml-4 w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="group bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white/20 text-xl px-16 py-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-110 font-bold"
                >
                  <Globe className="mr-4 w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
                  Explore Now
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { icon: Shield, text: "100% Secure", color: "emerald" },
                { icon: Award, text: "Award Winning", color: "yellow" },
                { icon: TrendingUp, text: "Fast Growing", color: "purple" },
                { icon: Users, text: "Community Driven", color: "blue" }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <item.icon className={`w-8 h-8 text-${item.color}-300 mx-auto mb-2 group-hover:scale-125 transition-transform duration-300`} />
                  <p className="text-white/80 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Footer Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Recycle className="w-10 h-10 text-white" />
              </div>
              <span className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                ReWear
              </span>
            </div>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Revolutionizing fashion sustainability through AI-powered clothing exchange
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-emerald-400 mb-6">Platform</h3>
              <ul className="space-y-4">
                {["Browse Items", "How It Works", "AI Matching", "Carbon Impact"].map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-white/70 hover:text-emerald-300 transition-colors duration-300 flex items-center group">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-6">Community</h3>
              <ul className="space-y-4">
                {["Success Stories", "Fashion Tips", "Sustainability Blog", "User Reviews"].map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-white/70 hover:text-purple-300 transition-colors duration-300 flex items-center group">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Support</h3>
              <ul className="space-y-4">
                {["Help Center", "Live Chat", "API Docs", "Developer Tools"].map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-white/70 hover:text-blue-300 transition-colors duration-300 flex items-center group">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">Company</h3>
              <ul className="space-y-4">
                {["About Us", "Careers", "Press Kit", "Partnerships"].map((link, index) => (
                  <li key={index}>
                    <Link href="#" className="text-white/70 hover:text-yellow-300 transition-colors duration-300 flex items-center group">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-8 mb-8 md:mb-0">
              <Badge className="px-4 py-2 bg-emerald-500/20 border-emerald-400/30 text-emerald-300">
                Carbon Negative
              </Badge>
              <Badge className="px-4 py-2 bg-purple-500/20 border-purple-400/30 text-purple-300">
                AI Powered
              </Badge>
              <Badge className="px-4 py-2 bg-blue-500/20 border-blue-400/30 text-blue-300">
                Community Driven
              </Badge>
            </div>
            <p className="text-white/50 text-lg">
              &copy; 2024 ReWear. Revolutionizing fashion sustainability.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}