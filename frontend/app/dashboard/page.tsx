"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Star,
  Package,
  ArrowUpDown,
  TrendingUp,
  Heart,
  Eye,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user profile data
  const userProfile = {
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    points: user?.points || 1250,
    avatar: "/placeholder.svg?height=80&width=80",
    location: "New York, NY",
    memberSince: "March 2024",
    rating: 4.8,
    totalSwaps: 23,
    itemsListed: 15,
    completedSwaps: 18,
    ongoingSwaps: 5,
    bio: "Sustainable fashion enthusiast who loves vintage pieces and eco-friendly brands. Always looking for unique items to add to my wardrobe!",
    badges: ["Eco Warrior", "Vintage Lover", "Top Swapper"],
  }

  // Mock uploaded items data
  const uploadedItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      image: "/placeholder.svg?height=200&width=200",
      status: "active",
      views: 45,
      likes: 12,
      messages: 3,
      points: 150,
      listedDate: "2 days ago",
      condition: "Excellent",
    },
    {
      id: 2,
      title: "Designer Handbag",
      image: "/placeholder.svg?height=200&width=200",
      status: "pending",
      views: 23,
      likes: 8,
      messages: 1,
      points: 200,
      listedDate: "1 week ago",
      condition: "Like New",
    },
    {
      id: 3,
      title: "Summer Dress",
      image: "/placeholder.svg?height=200&width=200",
      status: "swapped",
      views: 67,
      likes: 19,
      messages: 5,
      points: 120,
      listedDate: "2 weeks ago",
      condition: "Good",
    },
    {
      id: 4,
      title: "Silk Blouse",
      image: "/placeholder.svg?height=200&width=200",
      status: "active",
      views: 32,
      likes: 15,
      messages: 2,
      points: 130,
      listedDate: "5 days ago",
      condition: "Excellent",
    },
    {
      id: 5,
      title: "Wool Sweater",
      image: "/placeholder.svg?height=200&width=200",
      status: "inactive",
      views: 18,
      likes: 6,
      messages: 0,
      points: 110,
      listedDate: "3 weeks ago",
      condition: "Good",
    },
  ]

  // Mock swaps data
  const swaps = [
    {
      id: 1,
      type: "ongoing",
      status: "pending_approval",
      myItem: {
        title: "Blue Denim Jacket",
        image: "/placeholder.svg?height=100&width=100",
        points: 150,
      },
      theirItem: {
        title: "White Sneakers",
        image: "/placeholder.svg?height=100&width=100",
        points: 120,
      },
      partner: {
        name: "Sarah M.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      date: "2 days ago",
      lastUpdate: "Waiting for Sarah's response",
    },
    {
      id: 2,
      type: "ongoing",
      status: "in_transit",
      myItem: {
        title: "Red Dress",
        image: "/placeholder.svg?height=100&width=100",
        points: 180,
      },
      theirItem: {
        title: "Black Boots",
        image: "/placeholder.svg?height=100&width=100",
        points: 160,
      },
      partner: {
        name: "Mike R.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      date: "1 week ago",
      lastUpdate: "Items shipped, tracking available",
    },
    {
      id: 3,
      type: "completed",
      status: "completed",
      myItem: {
        title: "Green Cardigan",
        image: "/placeholder.svg?height=100&width=100",
        points: 140,
      },
      theirItem: {
        title: "Designer Scarf",
        image: "/placeholder.svg?height=100&width=100",
        points: 130,
      },
      partner: {
        name: "Emma L.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
      },
      date: "2 weeks ago",
      lastUpdate: "Swap completed successfully",
    },
    {
      id: 4,
      type: "completed",
      status: "completed",
      myItem: {
        title: "Vintage Jeans",
        image: "/placeholder.svg?height=100&width=100",
        points: 120,
      },
      theirItem: {
        title: "Leather Belt",
        image: "/placeholder.svg?height=100&width=100",
        points: 100,
      },
      partner: {
        name: "Alex K.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      date: "1 month ago",
      lastUpdate: "Swap completed successfully",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "pending":
        return "bg-yellow-600"
      case "swapped":
        return "bg-blue-600"
      case "inactive":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getSwapStatusIcon = (status: string) => {
    switch (status) {
      case "pending_approval":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "in_transit":
        return <ArrowUpDown className="w-4 h-4 text-blue-600" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">ReWear</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/add-item">
                <Plus className="w-4 h-4 mr-2" />
                List Item
              </Link>
            </Button>
            <Avatar>
              <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{userProfile.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Member since {userProfile.memberSince}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>
                            {userProfile.rating} ({userProfile.totalSwaps} swaps)
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>

                  {/* Points Balance */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{userProfile.points}</div>
                        <div className="text-sm text-green-700">Available Points</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-xl font-bold text-gray-900">{userProfile.itemsListed}</div>
                        <div className="text-sm text-gray-600">Items Listed</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-xl font-bold text-gray-900">{userProfile.completedSwaps}</div>
                        <div className="text-sm text-gray-600">Completed Swaps</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-xl font-bold text-gray-900">{userProfile.ongoingSwaps}</div>
                        <div className="text-sm text-gray-600">Ongoing Swaps</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 mb-4">{userProfile.bio}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {userProfile.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="bg-green-100 text-green-800">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">My Items ({uploadedItems.length})</TabsTrigger>
            <TabsTrigger value="swaps">Swaps ({swaps.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+180</div>
                  <p className="text-xs text-muted-foreground">Points earned</p>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                  <Package className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {uploadedItems.filter((item) => item.status === "active").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Currently listed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Swap Success Rate</CardTitle>
                  <ArrowUpDown className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">Above average</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swaps.slice(0, 3).map((swap) => (
                    <div key={swap.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getSwapStatusIcon(swap.status)}
                        <div>
                          <p className="font-medium">
                            {swap.myItem.title} ↔ {swap.theirItem.title}
                          </p>
                          <p className="text-sm text-gray-600">with {swap.partner.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={swap.type === "completed" ? "default" : "secondary"}>
                          {swap.status.replace("_", " ")}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{swap.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Uploaded Items Overview</h2>
              <Button asChild>
                <Link href="/add-item">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Item
                </Link>
              </Button>
            </div>

            {/* Items Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-green-600">
                    {uploadedItems.filter((item) => item.status === "active").length}
                  </div>
                  <div className="text-sm text-gray-600">Active</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-yellow-600">
                    {uploadedItems.filter((item) => item.status === "pending").length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {uploadedItems.filter((item) => item.status === "swapped").length}
                  </div>
                  <div className="text-sm text-gray-600">Swapped</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-gray-600">
                    {uploadedItems.filter((item) => item.status === "inactive").length}
                  </div>
                  <div className="text-sm text-gray-600">Inactive</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {uploadedItems.reduce((sum, item) => sum + item.views, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </CardContent>
              </Card>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(item.status)}`}>{item.status}</Badge>
                      <Badge className="absolute top-2 left-2 bg-green-600">{item.condition}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{item.messages}</span>
                          </div>
                        </div>
                        <span className="font-semibold text-green-600">{item.points} pts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{item.listedDate}</span>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/item/${item.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <h2 className="text-2xl font-bold">Ongoing and Completed Swaps</h2>

            {/* Swaps Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-yellow-600">
                    {swaps.filter((swap) => swap.status === "pending_approval").length}
                  </div>
                  <div className="text-sm text-gray-600">Pending Approval</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {swaps.filter((swap) => swap.status === "in_transit").length}
                  </div>
                  <div className="text-sm text-gray-600">In Transit</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-green-600">
                    {swaps.filter((swap) => swap.status === "completed").length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {swaps.reduce((sum, swap) => sum + swap.myItem.points, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Points Earned</div>
                </CardContent>
              </Card>
            </div>

            {/* Ongoing Swaps */}
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Swaps ({swaps.filter((swap) => swap.type === "ongoing").length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swaps
                    .filter((swap) => swap.type === "ongoing")
                    .map((swap) => (
                      <div key={swap.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {getSwapStatusIcon(swap.status)}
                            <Badge variant="secondary">{swap.status.replace("_", " ")}</Badge>
                          </div>
                          <span className="text-sm text-gray-500">{swap.date}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          {/* My Item */}
                          <div className="flex items-center gap-3">
                            <Image
                              src={swap.myItem.image || "/placeholder.svg"}
                              alt={swap.myItem.title}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{swap.myItem.title}</p>
                              <p className="text-sm text-green-600">{swap.myItem.points} points</p>
                            </div>
                          </div>

                          {/* Swap Arrow */}
                          <div className="flex justify-center">
                            <ArrowUpDown className="w-6 h-6 text-gray-400" />
                          </div>

                          {/* Their Item */}
                          <div className="flex items-center gap-3">
                            <Image
                              src={swap.theirItem.image || "/placeholder.svg"}
                              alt={swap.theirItem.title}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{swap.theirItem.title}</p>
                              <p className="text-sm text-green-600">{swap.theirItem.points} points</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={swap.partner.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{swap.partner.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{swap.partner.name}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{swap.partner.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{swap.lastUpdate}</span>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Completed Swaps */}
            <Card>
              <CardHeader>
                <CardTitle>Completed Swaps ({swaps.filter((swap) => swap.type === "completed").length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swaps
                    .filter((swap) => swap.type === "completed")
                    .map((swap) => (
                      <div key={swap.id} className="border rounded-lg p-4 bg-green-50 border-green-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <Badge className="bg-green-600">Completed</Badge>
                          </div>
                          <span className="text-sm text-gray-500">{swap.date}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          {/* My Item */}
                          <div className="flex items-center gap-3">
                            <Image
                              src={swap.myItem.image || "/placeholder.svg"}
                              alt={swap.myItem.title}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{swap.myItem.title}</p>
                              <p className="text-sm text-green-600">+{swap.myItem.points} points earned</p>
                            </div>
                          </div>

                          {/* Swap Arrow */}
                          <div className="flex justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>

                          {/* Their Item */}
                          <div className="flex items-center gap-3">
                            <Image
                              src={swap.theirItem.image || "/placeholder.svg"}
                              alt={swap.theirItem.title}
                              width={60}
                              height={60}
                              className="w-15 h-15 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{swap.theirItem.title}</p>
                              <p className="text-sm text-gray-600">Received</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-green-200">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={swap.partner.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{swap.partner.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{swap.partner.name}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{swap.partner.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              Leave Review
                            </Button>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
