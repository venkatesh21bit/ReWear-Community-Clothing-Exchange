"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Plus, Star, Package, ArrowUpDown, TrendingUp, Heart, Eye, MessageCircle, MapPin } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const userStats = {
    points: 1250,
    totalSwaps: 23,
    itemsListed: 15,
    rating: 4.8,
    joinDate: "March 2024",
  }

  const myItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      image: "/placeholder.svg?height=200&width=200",
      status: "active",
      views: 45,
      likes: 12,
      messages: 3,
      listedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Designer Handbag",
      image: "/placeholder.svg?height=200&width=200",
      status: "pending",
      views: 23,
      likes: 8,
      messages: 1,
      listedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Summer Dress",
      image: "/placeholder.svg?height=200&width=200",
      status: "swapped",
      views: 67,
      likes: 19,
      messages: 5,
      listedDate: "2 weeks ago",
    },
  ]

  const recentSwaps = [
    {
      id: 1,
      type: "completed",
      item: "Blue Denim Jacket",
      partner: "Sarah M.",
      date: "3 days ago",
      points: 150,
    },
    {
      id: 2,
      type: "pending",
      item: "White Sneakers",
      partner: "Mike R.",
      date: "1 week ago",
      points: 120,
    },
    {
      id: 3,
      type: "completed",
      item: "Black Dress",
      partner: "Emma L.",
      date: "2 weeks ago",
      points: 200,
    },
  ]

  const handleEditProfile = () => {
    alert("Edit Profile functionality would go here!")
    console.log("Edit Profile clicked")
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
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <CardTitle>John Doe</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" />
                  New York, NY
                </CardDescription>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{userStats.rating}</span>
                  <span className="text-sm text-gray-500">({userStats.totalSwaps} swaps)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.points}</div>
                  <div className="text-sm text-gray-500">Points Available</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Items Listed</span>
                    <span className="font-semibold">{userStats.itemsListed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Swaps</span>
                    <span className="font-semibold">{userStats.totalSwaps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="font-semibold">{userStats.joinDate}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent" onClick={handleEditProfile}>
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="items">My Items</TabsTrigger>
                <TabsTrigger value="swaps">Swaps</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">{userStats.points}</div>
                      <p className="text-xs text-muted-foreground">+180 from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                      <Package className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">3 pending approval</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">This Month</CardTitle>
                      <ArrowUpDown className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">Successful swaps</p>
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
                      {recentSwaps.slice(0, 3).map((swap) => (
                        <div key={swap.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                swap.type === "completed" ? "bg-green-500" : "bg-yellow-500"
                              }`}
                            />
                            <div>
                              <p className="font-medium">{swap.item}</p>
                              <p className="text-sm text-gray-600">with {swap.partner}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={swap.type === "completed" ? "default" : "secondary"}>{swap.type}</Badge>
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
                  <h2 className="text-2xl font-bold">My Items</h2>
                  <Button asChild>
                    <Link href="/add-item">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Item
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myItems.map((item) => (
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
                          <Badge
                            className={`absolute top-2 right-2 ${
                              item.status === "active"
                                ? "bg-green-600"
                                : item.status === "pending"
                                  ? "bg-yellow-600"
                                  : "bg-gray-600"
                            }`}
                          >
                            {item.status}
                          </Badge>
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
                <h2 className="text-2xl font-bold">Swap History</h2>

                <Card>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {recentSwaps.map((swap, index) => (
                        <div key={swap.id} className={`p-4 ${index !== recentSwaps.length - 1 ? "border-b" : ""}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  swap.type === "completed" ? "bg-green-500" : "bg-yellow-500"
                                }`}
                              />
                              <div>
                                <h3 className="font-semibold">{swap.item}</h3>
                                <p className="text-sm text-gray-600">Swapped with {swap.partner}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={swap.type === "completed" ? "default" : "secondary"}>{swap.type}</Badge>
                              <p className="text-sm text-gray-500 mt-1">{swap.date}</p>
                              <p className="text-sm font-semibold text-green-600">+{swap.points} points</p>
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
      </div>
    </div>
  )
}
