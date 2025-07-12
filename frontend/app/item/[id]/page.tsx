"use client"

import { useState, useEffect } from "react"
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
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Share2, Star, MapPin, Calendar, ArrowUpDown, MessageCircle, Shield, Truck, Loader2, ArrowLeft, Package } from "lucide-react"
import { itemsAPI, transactionsAPI, Item } from "@/lib/api"
import { useParams, useRouter } from "next/navigation"

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = useState<Item | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [swapMessage, setSwapMessage] = useState("")
  const [isSendingSwapRequest, setIsSendingSwapRequest] = useState(false)
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false)
  const [purchaseMode, setPurchaseMode] = useState<"points" | "swap">("points")
  const [requestStatus, setRequestStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  useEffect(() => {
    const fetchItem = async () => {
      if (!params.id || typeof params.id !== "string") {
        setError("Invalid item ID")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const itemData = await itemsAPI.getItemDetails(params.id)
        setItem(itemData)
        setIsLiked(itemData.is_liked)
      } catch (err: any) {
        console.error("Failed to fetch item:", err)
        setError(err.message || "Failed to load item")
      } finally {
        setIsLoading(false)
      }
    }

    fetchItem()
  }, [params.id])

  const handleSendSwapRequest = async () => {
    if (!item) return

    setIsSendingSwapRequest(true)
    setRequestStatus(null)

    try {
      const response = await transactionsAPI.createSwapRequest({
        requested_item_id: item.item_id,
        method: "swap",
        message: swapMessage,
      })

      if (response.success) {
        setRequestStatus({ type: "success", message: "Swap request sent successfully!" })
        setSwapMessage("")
      }
    } catch (error: any) {
      console.error("Failed to send swap request:", error)
      setRequestStatus({ type: "error", message: error.message || "Failed to send swap request" })
    } finally {
      setIsSendingSwapRequest(false)
    }
  }

  const handlePurchaseWithPoints = async () => {
    if (!item) return

    setIsProcessingPurchase(true)
    setRequestStatus(null)

    try {
      const response = await itemsAPI.purchaseItem(item.item_id, "points", undefined, item.points_value)

      if (response.success) {
        setRequestStatus({ type: "success", message: "Item purchased successfully!" })
        // Refresh item data
        const updatedItem = await itemsAPI.getItemDetails(item.item_id)
        setItem(updatedItem)
      }
    } catch (error: any) {
      console.error("Failed to purchase item:", error)
      setRequestStatus({ type: "error", message: error.message || "Failed to purchase item" })
    } finally {
      setIsProcessingPurchase(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The item you're looking for doesn't exist"}</p>
          <Link href="/browse">
            <Button>Browse Items</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">ReWear</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={item.images[currentImageIndex]?.image || item.primary_image || "/placeholder.svg"}
                alt={item.title}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg border"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="sm" variant="secondary">
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="sm" variant="secondary">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Image Thumbnails */}
            {item.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {item.images.map((img, index) => (
                  <button
                    key={img.image_id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      currentImageIndex === index ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img.image}
                      alt={`${item.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-green-600">{item.points_value} points</span>
                <Badge variant="outline">{item.condition}</Badge>
                <Badge variant="secondary">{item.category}</Badge>
              </div>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Item Details Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Size</p>
                <p className="font-medium">{item.size || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Brand</p>
                <p className="font-medium">{item.brand || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Color</p>
                <p className="font-medium">{item.color || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Views</p>
                <p className="font-medium">{item.views_count}</p>
              </div>
            </div>

            {/* Tags */}
            {item.tag_list.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {item.tag_list.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Status Message */}
            {requestStatus && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  requestStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {requestStatus.message}
              </div>
            )}

            {/* Action Buttons */}
            {item.status === "active" && (
              <div className="space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePurchaseWithPoints}
                  disabled={isProcessingPurchase}
                >
                  {isProcessingPurchase ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Purchase for ${item.points_value} points`
                  )}
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" size="lg">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Propose Swap
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Propose a Swap</DialogTitle>
                      <DialogDescription>
                        Send a message to {item.uploader.full_name} about swapping items
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Hi! I'm interested in swapping this item..."
                          value={swapMessage}
                          onChange={(e) => setSwapMessage(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <Button
                        onClick={handleSendSwapRequest}
                        disabled={isSendingSwapRequest || !swapMessage.trim()}
                        className="w-full"
                      >
                        {isSendingSwapRequest ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Swap Request"
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {item.status !== "active" && (
              <div className="p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600">
                  This item is no longer available for purchase or swap.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Seller Information */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>About the Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={item.uploader.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{item.uploader.full_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.uploader.full_name}</h3>
                  {item.uploader.bio && (
                    <p className="text-gray-600 mb-3">{item.uploader.bio}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {item.uploader.average_rating}/5 ({item.uploader.total_swaps} swaps)
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.uploader.location || "Location not set"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Member since {new Date(item.uploader.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{item.uploader.points_balance}</div>
                  <div className="text-sm text-gray-500">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
