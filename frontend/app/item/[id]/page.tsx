"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Added Select import
import { Heart, Share2, Star, MapPin, Calendar, ArrowUpDown, MessageCircle, Shield, Truck, Loader2 } from "lucide-react"

export default function ItemDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [swapMessage, setSwapMessage] = useState("")
  const [isSendingSwapRequest, setIsSendingSwapRequest] = useState(false)
  // Renamed isRedeeming to isProcessingPurchase for broader use
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false)
  // New state for purchase mode (currency or points)
  const [purchaseMode, setPurchaseMode] = useState<"currency" | "points">("currency")
  // New state for purchase status message
  const [purchaseStatus, setPurchaseStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  // New state for earned points
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null)

  const item = {
    id: 1,
    title: "Vintage Denim Jacket",
    description:
      "Beautiful vintage denim jacket in excellent condition. This classic piece has been well-maintained and shows minimal signs of wear. Perfect for layering and adding a timeless touch to any outfit. The jacket features original hardware and authentic vintage styling.",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    condition: "Excellent",
    points: 150, // Points for redemption
    usdPrice: 75, // New: Price in USD
    category: "Outerwear",
    size: "M",
    brand: "Levi's",
    color: "Blue",
    tags: ["vintage", "denim", "classic", "layering"],
    likes: 24,
    views: 156,
    listedDate: "3 days ago",
    status: "available",
    owner: {
      name: "Sarah Mitchell",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      totalSwaps: 47,
      location: "Brooklyn, NY",
      joinDate: "January 2023",
      responseTime: "Usually responds within 2 hours",
    },
  }

  const suggestedItems = [
    {
      id: 2,
      title: "Black Leather Boots",
      image: "/placeholder.svg?height=200&width=200",
      points: 120,
      condition: "Good",
    },
    {
      id: 3,
      title: "Wool Sweater",
      image: "/placeholder.svg?height=200&width=200",
      points: 100,
      condition: "Like New",
    },
    {
      id: 4,
      title: "Designer Handbag",
      image: "/placeholder.svg?height=200&width=200",
      points: 200,
      condition: "Excellent",
    },
  ]

  const POINTS_PER_USD = 1 // Proportionality factor: 1 point per USD

  const handleSendSwapRequest = async () => {
    setIsSendingSwapRequest(true)
    console.log(`Sending swap request for item ${item.id} with message: "${swapMessage}"`)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert(`Swap request sent to ${item.owner.name} for "${item.title}"!`)
    setIsSendingSwapRequest(false)
    setSwapMessage("") // Clear message after sending
    // Close dialog (assuming DialogClose is used in the button)
  }

  // Combined purchase function for currency and points
  const handlePurchase = async (mode: "currency" | "points") => {
    setIsProcessingPurchase(true)
    setPurchaseStatus(null) // Clear previous status
    setEarnedPoints(null) // Clear previously earned points

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      if (mode === "currency") {
        const calculatedPointsEarned = item.usdPrice * POINTS_PER_USD
        setEarnedPoints(calculatedPointsEarned) // Set points earned
        setPurchaseStatus({
          type: "success",
          message: `Successfully purchased "${item.title}" for $${item.usdPrice}! You earned ${calculatedPointsEarned} points.`,
        })
      } else {
        // mode === "points"
        setPurchaseStatus({
          type: "success",
          message: `Successfully redeemed "${item.title}" for ${item.points} points!`,
        })
      }
    } catch (error) {
      console.error("Purchase error:", error)
      setPurchaseStatus({ type: "error", message: "An unexpected error occurred during purchase." })
    } finally {
      setIsProcessingPurchase(false)
    }
  }

  const handleMessageOwner = () => {
    alert(`Opening chat with ${item.owner.name}.`)
    console.log(`Messaging owner ${item.owner.name} for item ${item.title}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={item.images[currentImageIndex] || "/placeholder.svg"}
                alt={item.title}
                width={500}
                height={500}
                className="w-full h-96 object-cover rounded-lg"
              />
              <Badge className="absolute top-4 left-4 bg-green-600">{item.condition}</Badge>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0" onClick={() => setIsLiked(!isLiked)}>
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? "border-green-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${item.title} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{item.likes} likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Listed {item.listedDate}</span>
                </div>
              </div>

              {/* Updated: Conditional price display and mode selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  {purchaseMode === "currency" ? `$${item.usdPrice}` : `${item.points} points`}
                </span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {item.status}
                </Badge>
                <Select value={purchaseMode} onValueChange={(value: "currency" | "points") => setPurchaseMode(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select purchase mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="currency">Buy with Currency</SelectItem>
                    <SelectItem value="points">Redeem with Points</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Purchase Status Message */}
            {purchaseStatus && (
              <div
                className={`p-3 rounded-lg text-center text-sm mb-4 ${
                  purchaseStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {purchaseStatus.message}
              </div>
            )}

            {/* Item Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Category</span>
                    <p className="font-medium">{item.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Size</span>
                    <p className="font-medium">{item.size}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Brand</span>
                    <p className="font-medium">{item.brand}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Color</span>
                    <p className="font-medium">{item.color}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Tags</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Conditional purchase button */}
              {purchaseMode === "currency" ? (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                  onClick={() => handlePurchase("currency")}
                  disabled={isProcessingPurchase}
                >
                  {isProcessingPurchase && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isProcessingPurchase ? "Processing..." : `Buy Now for $${item.usdPrice}`}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                  onClick={() => handlePurchase("points")}
                  disabled={isProcessingPurchase}
                >
                  {isProcessingPurchase && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isProcessingPurchase ? "Redeeming..." : `Redeem with ${item.points} Points`}
                </Button>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <ArrowUpDown className="w-5 h-5 mr-2" />
                    Request Swap
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Swap</DialogTitle>
                    <DialogDescription>
                      Send a message to {item.owner.name} to request a swap for this item.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Hi! I'm interested in swapping for your item..."
                        value={swapMessage}
                        onChange={(e) => setSwapMessage(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleSendSwapRequest}
                        disabled={isSendingSwapRequest}
                      >
                        {isSendingSwapRequest && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSendingSwapRequest ? "Sending..." : "Send Request"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" className="w-full" size="lg" onClick={handleMessageOwner}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Message Owner
              </Button>
            </div>

            {/* Trust & Safety */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Protected by ReWear's Swap Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Free shipping on all swaps</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Owner Profile */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Item Owner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={item.owner.avatar || "/placeholder.svg"} />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{item.owner.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.owner.rating}</span>
                      <span>({item.owner.totalSwaps} swaps)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{item.owner.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {item.owner.joinDate}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">{item.owner.responseTime}</div>

                <Button variant="outline" className="w-full bg-transparent">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedItems.map((suggestedItem) => (
              <Card key={suggestedItem.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={suggestedItem.image || "/placeholder.svg"}
                      alt={suggestedItem.title}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-green-600">{suggestedItem.condition}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {suggestedItem.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-600">{suggestedItem.points} points</span>
                      <Link href={`/item/${suggestedItem.id}`}>
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
        </div>
      </div>
    </div>
  )
}
