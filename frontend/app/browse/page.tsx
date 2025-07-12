"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Heart, Star, Grid3X3, List, SlidersHorizontal, Loader2, Search, Package } from "lucide-react"
import { itemsAPI, Item } from "@/lib/api"

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    size: "all",
    condition: "all",
    min_points: "",
    max_points: "",
  })

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const filters: any = {}
        if (selectedFilters.category && selectedFilters.category !== "all") filters.category = selectedFilters.category
        if (selectedFilters.size && selectedFilters.size !== "all") filters.size = selectedFilters.size
        if (selectedFilters.condition && selectedFilters.condition !== "all") filters.condition = selectedFilters.condition
        if (selectedFilters.min_points) filters.min_points = parseInt(selectedFilters.min_points)
        if (selectedFilters.max_points) filters.max_points = parseInt(selectedFilters.max_points)
        if (searchQuery.trim()) filters.search = searchQuery.trim()

        const response = await itemsAPI.getAllItems(filters)
        
        if (response.success) {
          setItems(response.results)
        }
      } catch (err: any) {
        console.error("Failed to fetch items:", err)
        setError(err.message || "Failed to load items")
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchItems, 300) // Debounce search
    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedFilters])

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      category: "all",
      size: "all",
      condition: "all",
      min_points: "",
      max_points: "",
    })
    setSearchQuery("")
  }

  const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "6", "7", "8", "9", "10", "11", "12"]
  const conditions = ["New with tags", "Like new", "Excellent", "Very good", "Good", "Fair"]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Items</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

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
                {/* Search */}
                <div>
                  <Label htmlFor="search" className="text-sm font-medium">Search</Label>
                  <div className="relative mt-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <Separator />

                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Select value={selectedFilters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Size Filter */}
                <div>
                  <Label className="text-sm font-medium">Size</Label>
                  <Select value={selectedFilters.size} onValueChange={(value) => handleFilterChange("size", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="All sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All sizes</SelectItem>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Condition Filter */}
                <div>
                  <Label className="text-sm font-medium">Condition</Label>
                  <Select value={selectedFilters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="All conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All conditions</SelectItem>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Point Range */}
                <div>
                  <Label className="text-sm font-medium">Points Range</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Input
                      placeholder="Min"
                      type="number"
                      value={selectedFilters.min_points}
                      onChange={(e) => handleFilterChange("min_points", e.target.value)}
                    />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={selectedFilters.max_points}
                      onChange={(e) => handleFilterChange("max_points", e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Clear Filters */}
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear All Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Browse Items</h1>
                <p className="text-gray-600">
                  {items.length} {items.length === 1 ? "item" : "items"} found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Items Grid/List */}
            {items.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
                {items.map((item) => (
                  <Card key={item.item_id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      {viewMode === "grid" ? (
                        <>
                          <div className="relative mb-3">
                            <Image
                              src={item.primary_image || "/placeholder.svg"}
                              alt={item.title}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <Badge className="absolute top-2 right-2 bg-white text-gray-700">
                              {item.condition}
                            </Badge>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="absolute bottom-2 right-2"
                            >
                              <Heart className={`w-4 h-4 ${item.is_liked ? "fill-red-500 text-red-500" : ""}`} />
                            </Button>
                          </div>
                          <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-green-600">{item.points_value} points</span>
                            <Badge variant="outline">{item.size}</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{item.uploader.full_name}</span>
                            <div className="flex items-center gap-2">
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {item.likes_count}
                              </span>
                              <Link href={`/item/${item.item_id}`}>
                                <Button size="sm">View</Button>
                              </Link>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-4">
                          <Image
                            src={item.primary_image || "/placeholder.svg"}
                            alt={item.title}
                            width={120}
                            height={120}
                            className="w-30 h-30 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-lg">{item.title}</h3>
                              <Badge>{item.condition}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="font-bold text-green-600">{item.points_value} points</span>
                                <Badge variant="outline">{item.size}</Badge>
                                <span className="text-sm text-gray-500">{item.uploader.full_name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                >
                                  <Heart className={`w-4 h-4 ${item.is_liked ? "fill-red-500 text-red-500" : ""}`} />
                                  {item.likes_count}
                                </Button>
                                <Link href={`/item/${item.item_id}`}>
                                  <Button size="sm">View Details</Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
