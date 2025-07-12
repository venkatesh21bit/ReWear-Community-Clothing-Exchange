"use client"

import { useState, useEffect } from "react"
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
  Loader2,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { itemsAPI, transactionsAPI, Item, Transaction } from "@/lib/api"

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [myItems, setMyItems] = useState<Item[]>([])
  const [myTransactions, setMyTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        setError(null)

        const [itemsResponse, transactionsResponse] = await Promise.all([
          itemsAPI.getMyItems(),
          transactionsAPI.getAllTransactions(),
        ])

        if (itemsResponse.success) {
          setMyItems(itemsResponse.results)
        }

        if (transactionsResponse.success) {
          setMyTransactions(transactionsResponse.results)
        }
      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err)
        setError(err.message || "Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-300"
      case "pending":
        return "bg-yellow-600/20 text-yellow-400"
      case "sold":
      case "swapped":
        return "bg-blue-500/20 text-blue-300"
      case "inactive":
        return "bg-gray-500/20 text-gray-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-300"
      case "pending":
        return "bg-yellow-600/20 text-yellow-400"
      case "declined":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-300" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Please log in to view your dashboard</h1>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 hover:scale-105">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-300" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-white">Error Loading Dashboard</h1>
          <p className="text-white/70 mb-4">{error}</p>
          <Button className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 hover:scale-105" onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/5 to-blue-500/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="w-24 h-24 border-2 border-emerald-500/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xl bg-emerald-500/20 text-emerald-300">{(user.full_name || "").charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text mb-2">{user.full_name || "Unnamed User"}</h1>
                  <p className="text-white/70 mb-4">{user.email}</p>
                  {user.bio && <p className="text-white/50 mb-4">{user.bio}</p>}
                  <div className="flex flex-wrap gap-4 text-sm text-white/50">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.location || "Location not set"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Member since {new Date(user.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-300" />
                      {user.average_rating || 0}/5 ({user.total_swaps || 0} swaps)
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-300">{user.points_balance || 0}</div>
                  <div className="text-sm text-white/70">ReWear Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Items Listed</p>
                  <p className="text-2xl font-bold text-white">{user.items_listed || 0}</p>
                </div>
                <Package className="w-8 h-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Completed Swaps</p>
                  <p className="text-2xl font-bold text-white">{user.completed_swaps || 0}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-300" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Ongoing Swaps</p>
                  <p className="text-2xl font-bold text-white">{user.ongoing_swaps || 0}</p>
                </div>
                <ArrowUpDown className="w-8 h-8 text-orange-300" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Points Balance</p>
                  <p className="text-2xl font-bold text-white">{user.points_balance || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-1">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 transition-all duration-300">Overview</TabsTrigger>
            <TabsTrigger value="items" className="text-white data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 transition-all duration-300">My Items ({myItems.length})</TabsTrigger>
            <TabsTrigger value="swaps" className="text-white data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 transition-all duration-300">Swaps ({myTransactions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Items */}
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Recent Items</CardTitle>
                  <Link href="/add-item">
                    <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 hover:scale-105">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {myItems.length === 0 ? (
                    <p className="text-white/50 text-center py-8">No items listed yet</p>
                  ) : (
                    <div className="space-y-4">
                      {myItems.slice(0, 3).map((item) => (
                        <div key={item.item_id} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                          <Image
                            src={item.primary_image || "/placeholder.svg"}
                            alt={item.title}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{item.title}</h4>
                            <p className="text-sm text-white/70">{item.points_value} points</p>
                            <Badge className={getStatusColor(item.status)} variant="secondary">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Recent Swaps</CardTitle>
                  <Link href="/browse">
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-emerald-500/20 transition-all duration-300">
                      Browse Items
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {myTransactions.length === 0 ? (
                    <p className="text-white/50 text-center py-8">No swaps yet</p>
                  ) : (
                    <div className="space-y-4">
                      {myTransactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.transaction_id} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                          <Avatar>
                            <AvatarImage src={transaction.partner.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-emerald-500/20 text-emerald-300">{(transaction.partner.full_name || "").charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{transaction.partner.full_name || "Unnamed User"}</h4>
                            <p className="text-sm text-white/70">{transaction.method} - {transaction.points_amount} points</p>
                            <Badge className={getTransactionStatusColor(transaction.status)} variant="secondary">
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Package className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No items listed</h3>
                  <p className="text-white/70 mb-4">Start by listing your first item to share with the community</p>
                  <Link href="/add-item">
                    <Button className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 hover:scale-105">
                      <Plus className="w-4 h-4 mr-2" />
                      List Your First Item
                    </Button>
                  </Link>
                </div>
              ) : (
                myItems.map((item) => (
                  <Card key={item.item_id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-lg">
                    <CardContent className="p-4">
                      <div className="relative mb-3">
                        <Image
                          src={item.primary_image || "/placeholder.svg"}
                          alt={item.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Badge className={`absolute top-2 right-2 ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-lg text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-white/70 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-emerald-300">{item.points_value} points</span>
                        <Badge variant="outline" className="bg-white/10 text-white">{item.condition}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-white/50">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.views_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {item.likes_count}
                          </span>
                        </div>
                        <Link href={`/item/${item.item_id}`}>
                          <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-emerald-500/20 transition-all duration-300">
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <div className="space-y-4">
              {myTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <ArrowUpDown className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No swaps yet</h3>
                  <p className="text-white/70 mb-4">Explore items and start your first swap</p>
                  <Link href="/browse">
                    <Button className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 hover:scale-105">
                      Browse Items
                    </Button>
                  </Link>
                </div>
              ) : (
                myTransactions.map((transaction) => (
                  <Card key={transaction.transaction_id} className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={transaction.partner.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-emerald-500/20 text-emerald-300">{(transaction.partner.full_name || "").charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-white">{transaction.partner.full_name || "Unnamed User"}</h4>
                            <p className="text-sm text-white/70">
                              {transaction.method} • {new Date(transaction.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge className={getTransactionStatusColor(transaction.status)} variant="secondary">
                          {transaction.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {transaction.my_item && (
                          <div className="border rounded-lg p-3 bg-white/10">
                            <p className="text-sm text-white/70 mb-2">Your Item</p>
                            <div className="flex items-center gap-3">
                              <Image
                                src={transaction.my_item.primary_image || "/placeholder.svg"}
                                alt={transaction.my_item.title}
                                width={50}
                                height={50}
                                className="rounded object-cover"
                              />
                              <div>
                                <h5 className="font-medium text-white">{transaction.my_item.title}</h5>
                                <p className="text-sm text-white/70">{transaction.my_item.points_value} points</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {transaction.their_item && (
                          <div className="border rounded-lg p-3 bg-white/10">
                            <p className="text-sm text-white/70 mb-2">Their Item</p>
                            <div className="flex items-center gap-3">
                              <Image
                                src={transaction.their_item.primary_image || "/placeholder.svg"}
                                alt={transaction.their_item.title}
                                width={50}
                                height={50}
                                className="rounded object-cover"
                              />
                              <div>
                                <h5 className="font-medium text-white">{transaction.their_item.title}</h5>
                                <p className="text-sm text-white/70">{transaction.their_item.points_value} points</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {transaction.method === "points" && (
                        <div className="mt-4 p-3 bg-emerald-500/20 rounded-lg">
                          <p className="text-sm text-emerald-300">
                            <span className="font-medium">Points: </span>
                            {transaction.points_amount}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}