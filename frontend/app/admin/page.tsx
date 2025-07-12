"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Shield,
  Users,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Trash2,
  Flag,
  TrendingUp,
} from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedItem, setSelectedItem] = useState(null)

  const stats = {
    totalUsers: 5247,
    activeItems: 1834,
    pendingItems: 23,
    reportedItems: 7,
    totalSwaps: 12456,
    monthlyGrowth: 15.3,
  }

  const pendingItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      image: "/placeholder.svg?height=100&width=100",
      owner: "John Doe",
      category: "Outerwear",
      condition: "Excellent",
      points: 180,
      submittedDate: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      title: "Designer Handbag",
      image: "/placeholder.svg?height=100&width=100",
      owner: "Sarah Smith",
      category: "Accessories",
      condition: "Like New",
      points: 250,
      submittedDate: "4 hours ago",
      status: "pending",
    },
    {
      id: 3,
      title: "Summer Dress",
      image: "/placeholder.svg?height=100&width=100",
      owner: "Emma Wilson",
      category: "Dresses",
      condition: "Good",
      points: 120,
      submittedDate: "1 day ago",
      status: "pending",
    },
  ]

  const reportedItems = [
    {
      id: 4,
      title: "Suspicious Item Listing",
      image: "/placeholder.svg?height=100&width=100",
      owner: "Unknown User",
      reason: "Inappropriate content",
      reportedBy: "Multiple users",
      reportDate: "1 day ago",
      severity: "high",
    },
    {
      id: 5,
      title: "Fake Brand Item",
      image: "/placeholder.svg?height=100&width=100",
      owner: "Jane Doe",
      reason: "Counterfeit product",
      reportedBy: "User123",
      reportDate: "2 days ago",
      severity: "medium",
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      joinDate: "2 days ago",
      itemsListed: 3,
      swapsCompleted: 0,
      status: "active",
    },
    {
      id: 2,
      name: "Bob Miller",
      email: "bob@example.com",
      joinDate: "1 week ago",
      itemsListed: 7,
      swapsCompleted: 2,
      status: "active",
    },
  ]

  const handleApproveItem = (itemId: number) => {
    console.log("Approving item:", itemId)
  }

  const handleRejectItem = (itemId: number) => {
    console.log("Rejecting item:", itemId)
  }

  const handleRemoveItem = (itemId: number) => {
    console.log("Removing item:", itemId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-800">ReWear Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline">User Dashboard</Button>
            </Link>
            <Button variant="ghost">Logout</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform content and user activities</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pending">Pending Items</TabsTrigger>
            <TabsTrigger value="reported">Reported Content</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                  <Package className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeItems.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{stats.pendingItems} pending approval</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSwaps.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Successful exchanges</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reports</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.reportedItems}</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                        </div>
                        <Badge variant="outline">{user.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Items Pending Review</span>
                      <Badge variant="secondary">{stats.pendingItems}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reported Content</span>
                      <Badge variant="destructive">{stats.reportedItems}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Swaps</span>
                      <Badge variant="default">156</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Status</span>
                      <Badge variant="default" className="bg-green-600">
                        Healthy
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Pending Item Approvals</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search items..." className="pl-10 w-64" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {pendingItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-gray-600">by {item.owner}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>{item.category}</span>
                              <span>•</span>
                              <span>{item.condition}</span>
                              <span>•</span>
                              <span>{item.points} points</span>
                              <span>•</span>
                              <span>Submitted {item.submittedDate}</span>
                            </div>
                          </div>
                          <Badge variant="secondary">{item.status}</Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review Item: {item.title}</DialogTitle>
                                <DialogDescription>
                                  Review this item submission for approval or rejection.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    width={200}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-lg"
                                  />
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium">Title</label>
                                      <p className="text-sm text-gray-600">{item.title}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Owner</label>
                                      <p className="text-sm text-gray-600">{item.owner}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Category</label>
                                      <p className="text-sm text-gray-600">{item.category}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Condition</label>
                                      <p className="text-sm text-gray-600">{item.condition}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Points</label>
                                      <p className="text-sm text-gray-600">{item.points}</p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Admin Notes</label>
                                  <Textarea placeholder="Add notes about this review..." className="mt-1" />
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button variant="outline">Cancel</Button>
                                  <Button variant="destructive" onClick={() => handleRejectItem(item.id)}>
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApproveItem(item.id)}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveItem(item.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRejectItem(item.id)}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reported" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Reported Content</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search reports..." className="pl-10 w-64" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reportedItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-gray-600">by {item.owner}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>Reason: {item.reason}</span>
                              <span>•</span>
                              <span>Reported by: {item.reportedBy}</span>
                              <span>•</span>
                              <span>{item.reportDate}</span>
                            </div>
                          </div>
                          <Badge variant={item.severity === "high" ? "destructive" : "secondary"}>
                            {item.severity} priority
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Investigate
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRemoveItem(item.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Item
                          </Button>
                          <Button size="sm" variant="outline">
                            <Flag className="w-4 h-4 mr-2" />
                            Dismiss Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search users..." className="pl-10 w-64" />
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4 font-medium">User</th>
                        <th className="text-left p-4 font-medium">Join Date</th>
                        <th className="text-left p-4 font-medium">Items Listed</th>
                        <th className="text-left p-4 font-medium">Swaps Completed</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{user.joinDate}</td>
                          <td className="p-4">{user.itemsListed}</td>
                          <td className="p-4">{user.swapsCompleted}</td>
                          <td className="p-4">
                            <Badge variant="outline">{user.status}</Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                View Profile
                              </Button>
                              <Button size="sm" variant="ghost">
                                Message
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
