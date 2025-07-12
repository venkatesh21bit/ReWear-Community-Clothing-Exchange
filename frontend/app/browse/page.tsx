"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Heart, Star, Grid3X3, List, SlidersHorizontal } from "lucide-react"

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    size: [],
    condition: [],
    priceRange: "",
  })
  // New state for display mode (currency or points)
  const [displayMode, setDisplayMode] = useState<"currency" | "points">("currency")

  const items = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Excellent",
      points: 150,
      usdPrice: 75, // Added USD price
      category: "Outerwear",
      size: "M",
      brand: "Levi's",
      likes: 24,
      owner: "Sarah M.",
      location: "Brooklyn, NY",
    },
    {
      id: 2,
      title: "Designer Summer Dress",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Like New",
      points: 200,
      usdPrice: 100, // Added USD price
      category: "Dresses",
      size: "S",
      brand: "Zara",
      likes: 18,
      owner: "Emma L.",
      location: "Manhattan, NY",
    },
    {
      id: 3,
      title: "Classic White Sneakers",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Good",
      points: 120,
      usdPrice: 60, // Added USD price
      category: "Shoes",
      size: "9",
      brand: "Nike",
      likes: 31,
      owner: "Mike R.",
      location: "Queens, NY",
    },
    {
      id: 4,
      title: "Wool Winter Coat",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Very Good",
      points: 180,
      usdPrice: 90, // Added USD price
      category: "Outerwear",
      size: "L",
      brand: "Uniqlo",
      likes: 15,
      owner: "Alex K.",
      location: "Bronx, NY",
    },
    {
      id: 5,
      title: "Silk Blouse",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Excellent",
      points: 130,
      usdPrice: 65, // Added USD price
      category: "Tops",
      size: "M",
      brand: "H&M",
      likes: 22,
      owner: "Lisa P.",
      location: "Brooklyn, NY",
    },
    {
      id: 6,
      title: "Leather Ankle Boots",
      image: "/placeholder.svg?height=300&width=300",
      condition: "Good",
      points: 140,
      usdPrice: 70, // Added USD price
      category: "Shoes",
      size: "8",
      brand: "Dr. Martens",
      likes: 27,
      owner: "Jenny W.",
      location: "Manhattan, NY",
    },
  ]

  const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const conditions = ["New with tags", "Like new", "Excellent", "Very good", "Good", "Fair"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card className="sticky top-4">
              <div className="p-4 border-b">
                <h2 className="font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </h2>
              </div>

              <div className="p-4 space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <Label htmlFor={category} className="text-sm font-normal">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Size Filter */}
                <div>
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox id={size} />
                        <Label htmlFor={size} className="text-sm font-normal">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Condition Filter */}
                <div>
                  <h3 className="font-medium mb-3">Condition</h3>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={condition} />
                        <Label htmlFor={condition} className="text-sm font-normal">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Point Range */}
                <div>
                  <h3 className="font-medium mb-3">Point Range</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-100">0 - 100 points</SelectItem>
                      <SelectItem value="100-200">100 - 200 points</SelectItem>
                      <SelectItem value="200-300">200 - 300 points</SelectItem>
                      <SelectItem value="300+">300+ points</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Clear Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Browse Items</h1>
                <p className="text-gray-600">{items.length} items available</p>
              </div>

              <div className="flex items-center gap-4">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="price-low">Points: Low to High</SelectItem>
                    <SelectItem value="price-high">Points: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                {/* New: Select for display mode */}
                <Select value={displayMode} onValueChange={(value: "currency" | "points") => setDisplayMode(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Display as" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="currency">Show Currency</SelectItem>
                    <SelectItem value="points">Show Points</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {items.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className={`${viewMode === "list" ? "flex" : ""}`}>
                      <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={300}
                          height={300}
                          className={`w-full object-cover ${viewMode === "list" ? "h-48" : "h-48 rounded-t-lg"}`}
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

                      <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className={`${viewMode === "list" ? "flex justify-between items-start" : ""}`}>
                          <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                              {item.title}
                            </h3>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                              <span>{item.brand}</span>
                              <span>Size {item.size}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{item.likes} likes</span>
                              <span className="mx-2">•</span>
                              <span>{item.location}</span>
                            </div>
                          </div>

                          <div
                            className={`${viewMode === "list" ? "text-right ml-4" : "flex items-center justify-between"}`}
                          >
                            {/* Updated: Conditional price display */}
                            <span className="font-semibold text-green-600 text-lg">
                              {displayMode === "currency" ? `$${item.usdPrice}` : `${item.points} points`}
                            </span>
                            {viewMode === "grid" && (
                              <Link href={`/item/${item.id}`}>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  View Item
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>

                        {viewMode === "list" && (
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-gray-600">by {item.owner}</span>
                            <Link href={`/item/${item.id}`}>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                View Item
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Items
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
