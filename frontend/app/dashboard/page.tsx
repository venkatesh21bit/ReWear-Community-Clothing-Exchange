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

        // Fetch user's items and transactions in parallel
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
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
      case "swapped":
        return "bg-blue-100 text-blue-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

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
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Error Loading Dashboard</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
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
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
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
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xl">{user.full_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.full_name}</h1>
                  <p className="text-gray-600 mb-4">{user.email}</p>
                  {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {user.location || "Location not set"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Member since {new Date(user.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {user.average_rating}/5 ({user.total_swaps} swaps)
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{user.points_balance}</div>
                  <div className="text-sm text-gray-500">ReWear Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Items Listed</p>
                  <p className="text-2xl font-bold">{user.items_listed}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Swaps</p>
                  <p className="text-2xl font-bold">{user.completed_swaps}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ongoing Swaps</p>
                  <p className="text-2xl font-bold">{user.ongoing_swaps}</p>
                </div>
                <ArrowUpDown className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Points Balance</p>
                  <p className="text-2xl font-bold">{user.points_balance}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">My Items ({myItems.length})</TabsTrigger>
            <TabsTrigger value="swaps">Swaps ({myTransactions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Items */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Items</CardTitle>
                  <Link href="/add-item">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {myItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No items listed yet</p>
                  ) : (
                    <div className="space-y-4">
                      {myItems.slice(0, 3).map((item) => (
                        <div key={item.item_id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Image
                            src={item.primary_image || "/placeholder.svg"}
                            alt={item.title}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.points_value} points</p>
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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Swaps</CardTitle>
                  <Link href="/browse">
                    <Button size="sm" variant="outline">
                      Browse Items
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {myTransactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No swaps yet</p>
                  ) : (
                    <div className="space-y-4">
                      {myTransactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.transaction_id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Avatar>
                            <AvatarImage src={transaction.partner.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{transaction.partner.full_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{transaction.partner.full_name}</h4>
                            <p className="text-sm text-gray-600">{transaction.method} - {transaction.points_amount} points</p>
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
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No items listed</h3>
                  <p className="text-gray-600 mb-4">Start by listing your first item to share with the community</p>
                  <Link href="/add-item">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      List Your First Item
                    </Button>
                  </Link>
                </div>
              ) : (
                myItems.map((item) => (
                  <Card key={item.item_id} className="hover:shadow-md transition-shadow">
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
                      <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-green-600">{item.points_value} points</span>
                        <Badge variant="outline">{item.condition}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
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
                          <Button size="sm" variant="outline">
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
                  <ArrowUpDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No swaps yet</h3>
                  <p className="text-gray-600 mb-4">Explore items and start your first swap</p>
                  <Link href="/browse">
                    <Button>
                      Browse Items
                    </Button>
                  </Link>
                </div>
              ) : (
                myTransactions.map((transaction) => (
                  <Card key={transaction.transaction_id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={transaction.partner.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{transaction.partner.full_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{transaction.partner.full_name}</h4>
                            <p className="text-sm text-gray-600">
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
                          <div className="border rounded-lg p-3">
                            <p className="text-sm text-gray-600 mb-2">Your Item</p>
                            <div className="flex items-center gap-3">
                              <Image
                                src={transaction.my_item.primary_image || "/placeholder.svg"}
                                alt={transaction.my_item.title}
                                width={50}
                                height={50}
                                className="rounded object-cover"
                              />
                              <div>
                                <h5 className="font-medium">{transaction.my_item.title}</h5>
                                <p className="text-sm text-gray-600">{transaction.my_item.points_value} points</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {transaction.their_item && (
                          <div className="border rounded-lg p-3">
                            <p className="text-sm text-gray-600 mb-2">Their Item</p>
                            <div className="flex items-center gap-3">
                              <Image
                                src={transaction.their_item.primary_image || "/placeholder.svg"}
                                alt={transaction.their_item.title}
                                width={50}
                                height={50}
                                className="rounded object-cover"
                              />
                              <div>
                                <h5 className="font-medium">{transaction.their_item.title}</h5>
                                <p className="text-sm text-gray-600">{transaction.their_item.points_value} points</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {transaction.method === "points" && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm">
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
