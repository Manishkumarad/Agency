"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/navigation"
import { getStoredUser, isAuthenticated } from "@/lib/auth"
import {
  Utensils,
  Plus,
  Clock,
  MapPin,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  Settings,
  Building,
  Heart,
  Package,
  CheckCircle,
} from "lucide-react"

// Mock dashboard data
const mockDashboardData = {
  donor: {
    stats: {
      totalListings: 24,
      activeListings: 3,
      totalDonations: 156,
      mealsProvided: 2847,
      wasteReduced: "1,240 kg",
      organizationsHelped: 18,
    },
    recentListings: [
      {
        id: 1,
        title: "Fresh Sandwiches & Salads",
        status: "active",
        requests: 2,
        expiryTime: "6:00 PM today",
        quantity: "25 servings",
      },
      {
        id: 2,
        title: "Day-Old Pastries",
        status: "claimed",
        claimedBy: "Community Center",
        pickupTime: "5:30 PM today",
        quantity: "15 items",
      },
      {
        id: 3,
        title: "Soup & Bread Combo",
        status: "completed",
        completedAt: "Yesterday",
        quantity: "30 servings",
      },
    ],
    pendingRequests: [
      {
        id: 1,
        listingTitle: "Fresh Sandwiches & Salads",
        requesterName: "Mike Chen",
        requesterOrg: "Food Rescue Alliance",
        requestedAt: "2 hours ago",
        message: "Can pick up within 30 minutes for our evening distribution.",
      },
      {
        id: 2,
        listingTitle: "Fresh Sandwiches & Salads",
        requesterName: "Lisa Rodriguez",
        requesterOrg: "Eastside Shelter",
        requestedAt: "1 hour ago",
        message: "Perfect for our dinner service tonight.",
      },
    ],
  },
  receiver: {
    stats: {
      totalRequests: 45,
      successfulPickups: 38,
      mealsReceived: 1256,
      peopleServed: 892,
      partnersWorkedWith: 12,
      lastPickup: "2 days ago",
    },
    upcomingPickups: [
      {
        id: 1,
        listingTitle: "Fresh Produce Mix",
        donorName: "Green Market",
        pickupTime: "Tomorrow 10:00 AM",
        address: "456 Market St",
        quantity: "20 kg",
        status: "confirmed",
      },
      {
        id: 2,
        listingTitle: "Bakery Items",
        donorName: "Sunrise Bakery",
        pickupTime: "Tomorrow 2:00 PM",
        address: "789 Oak Ave",
        quantity: "2 bags",
        status: "pending",
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "pickup_completed",
        title: "Picked up sandwiches from Downtown Deli",
        time: "2 hours ago",
        quantity: "25 servings",
      },
      {
        id: 2,
        type: "request_accepted",
        title: "Request accepted by Green Market",
        time: "1 day ago",
        quantity: "20 kg produce",
      },
      {
        id: 3,
        type: "request_sent",
        title: "Sent request to Corner Bakery",
        time: "2 days ago",
        quantity: "Pastries",
      },
    ],
  },
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userType, setUserType] = useState<"donor" | "receiver">("donor")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }
    const userData = getStoredUser()
    if (userData) {
      setUser(userData)
      setUserType(userData.userType || "donor")
    } else {
      router.push("/login")
    }
  }, [router])

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const data = mockDashboardData[userType]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "pickup_completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "request_accepted":
        return <Heart className="h-4 w-4 text-primary" />
      case "request_sent":
        return <Package className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}!</h2>
            <p className="text-muted-foreground mt-1">
              {user.organizationName} • {userType === "donor" ? "Food Donor" : "Food Receiver"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* User Type Toggle for Demo */}
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "donor" | "receiver")}>
              <TabsList>
                <TabsTrigger value="donor" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Donor View
                </TabsTrigger>
                <TabsTrigger value="receiver" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Receiver View
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Donor Dashboard */}
        {userType === "donor" && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{data.stats.activeListings}</div>
                  <p className="text-xs text-muted-foreground">of {data.stats.totalListings} total</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Meals Provided</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{data.stats.mealsProvided.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">across {data.stats.totalDonations} donations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Waste Reduced</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{data.stats.wasteReduced}</div>
                  <p className="text-xs text-muted-foreground">food saved from waste</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Organizations Helped</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{data.stats.organizationsHelped}</div>
                  <p className="text-xs text-muted-foreground">community partners</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Listings */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Listings</CardTitle>
                    <Link href="/listings/create">
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        New Listing
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.recentListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{listing.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {listing.quantity}
                            </span>
                            {listing.status === "active" && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {listing.expiryTime}
                              </span>
                            )}
                            {listing.status === "claimed" && (
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                Claimed by {listing.claimedBy}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {listing.status === "active" && listing.requests && (
                            <Badge variant="outline">{listing.requests} requests</Badge>
                          )}
                          <Badge
                            variant={
                              listing.status === "active"
                                ? "default"
                                : listing.status === "claimed"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              listing.status === "active"
                                ? "bg-green-500 hover:bg-green-600"
                                : listing.status === "completed"
                                  ? "bg-blue-500 hover:bg-blue-600"
                                  : ""
                            }
                          >
                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Pending Requests */}
              <div>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Pending Requests</CardTitle>
                    <Link href="/requests">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.pendingRequests.map((request) => (
                      <div key={request.id} className="p-3 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-medium text-sm text-foreground">{request.requesterOrg}</h5>
                            <p className="text-xs text-muted-foreground">{request.requesterName}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {request.requestedAt}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{request.message}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 text-xs h-7">
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-xs h-7 bg-transparent">
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Receiver Dashboard */}
        {userType === "receiver" && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Successful Pickups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{data.stats.successfulPickups}</div>
                  <p className="text-xs text-muted-foreground">of {data.stats.totalRequests} requests</p>
                  <Progress value={(data.stats.successfulPickups / data.stats.totalRequests) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Meals Received</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{data.stats.mealsReceived.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">serving {data.stats.peopleServed} people</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Partner Donors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">{data.stats.partnersWorkedWith}</div>
                  <p className="text-xs text-muted-foreground">regular partners</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Last Pickup</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{data.stats.lastPickup}</div>
                  <p className="text-xs text-muted-foreground">most recent collection</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Upcoming Pickups */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Upcoming Pickups</CardTitle>
                    <Link href="/listings">
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Browse Food
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.upcomingPickups.map((pickup) => (
                      <div
                        key={pickup.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{pickup.listingTitle}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {pickup.donorName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {pickup.quantity}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {pickup.pickupTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {pickup.address}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={pickup.status === "confirmed" ? "default" : "secondary"}
                            className={pickup.status === "confirmed" ? "bg-green-500 hover:bg-green-600" : ""}
                          >
                            {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <MapPin className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-2">{activity.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                            <Badge variant="outline" className="text-xs">
                              {activity.quantity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {userType === "donor" ? (
                <>
                  <Link href="/listings/create">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                    >
                      <Plus className="h-6 w-6" />
                      <span>Create Listing</span>
                    </Button>
                  </Link>
                  <Link href="/requests">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                    >
                      <Bell className="h-6 w-6" />
                      <span>View Requests</span>
                    </Button>
                  </Link>
                  <Link href="/listings">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                    >
                      <Utensils className="h-6 w-6" />
                      <span>My Listings</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/analytics">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                    >
                      <TrendingUp className="h-6 w-6" />
                      <span>View Analytics</span>
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/listings">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                    >
                      <Utensils className="h-6 w-6" />
                      <span>Browse Food</span>
                    </Button>
                  </Link>
                  <Link href="/map">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                    >
                      <MapPin className="h-6 w-6" />
                      <span>Map View</span>
                    </Button>
                  </Link>
                  <Link href="/requests">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                    >
                      <Calendar className="h-6 w-6" />
                      <span>My Requests</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/impact">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 bg-transparent"
                    >
                      <TrendingUp className="h-6 w-6" />
                      <span>View Impact</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
