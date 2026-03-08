"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Utensils, Clock, MapPin, Phone, MessageSquare, Check, X, User, Building } from "lucide-react"

// Mock data for pickup requests
const mockRequests = {
  incoming: [
    {
      id: 1,
      listingId: 1,
      listingTitle: "Fresh Sandwiches & Salads",
      requesterName: "Sarah Johnson",
      requesterOrg: "Downtown Community Center",
      requesterPhone: "(555) 987-6543",
      message:
        "Hi! We run a daily lunch program for seniors and would love to pick up these sandwiches. We can be there by 5:30 PM today. Thank you for helping our community!",
      requestedAt: "2024-01-15T14:30:00Z",
      status: "pending",
      pickupTime: "5:30 PM today",
      quantity: "25 servings",
    },
    {
      id: 2,
      listingId: 2,
      listingTitle: "Day-Old Bread & Pastries",
      requesterName: "Mike Chen",
      requesterOrg: "Food Rescue Alliance",
      requesterPhone: "(555) 456-7890",
      message: "We distribute baked goods to local shelters. Can pick up anytime before 7 PM.",
      requestedAt: "2024-01-15T13:15:00Z",
      status: "accepted",
      pickupTime: "6:00 PM today",
      quantity: "3 large bags",
    },
    {
      id: 3,
      listingId: 3,
      listingTitle: "Fresh Produce Mix",
      requesterName: "Lisa Rodriguez",
      requesterOrg: "Eastside Food Bank",
      requesterPhone: "(555) 321-0987",
      message: "Perfect for our weekend distribution. We have refrigerated transport.",
      requestedAt: "2024-01-15T12:00:00Z",
      status: "declined",
      pickupTime: "Tomorrow 1:00 PM",
      quantity: "15 kg",
      declineReason: "Already committed to another organization",
    },
  ],
  outgoing: [
    {
      id: 4,
      listingId: 5,
      listingTitle: "Catered Lunch Leftovers",
      donorName: "Maria Garcia",
      donorOrg: "Premium Catering",
      donorPhone: "(555) 111-2222",
      myMessage: "We serve 200+ families weekly and would appreciate this donation. We can pick up within 30 minutes.",
      requestedAt: "2024-01-15T15:45:00Z",
      status: "pending",
      pickupTime: "7:00 PM today",
      quantity: "50 servings",
    },
    {
      id: 5,
      listingId: 6,
      listingTitle: "Surplus Dairy Products",
      donorName: "John Smith",
      donorOrg: "Corner Market",
      donorPhone: "(555) 333-4444",
      myMessage: "Our shelter needs dairy products for breakfast program.",
      requestedAt: "2024-01-15T11:30:00Z",
      status: "accepted",
      pickupTime: "Tomorrow 9:00 AM",
      quantity: "20 items",
      pickupAddress: "456 Market St, Downtown",
    },
  ],
}

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("incoming")
  const [responseMessage, setResponseMessage] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)

  const handleAcceptRequest = (requestId: number) => {
    // TODO: connect to backend API
    console.log("Request accepted:", requestId)
    setResponseMessage("")
    setSelectedRequest(null)
  }

  const handleDeclineRequest = (requestId: number, reason: string) => {
    // TODO: implement decline functionality
    console.log("Request declined:", requestId, reason)
    setResponseMessage("")
    setSelectedRequest(null)
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200"
      case "declined":
        return "bg-red-100 text-red-800 border-red-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Pickup Requests</h2>
          <p className="text-muted-foreground">Manage your food donation requests and pickups</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Incoming Requests ({mockRequests.incoming.length})
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              My Requests ({mockRequests.outgoing.length})
            </TabsTrigger>
          </TabsList>

          {/* Incoming Requests Tab */}
          <TabsContent value="incoming" className="space-y-4">
            {mockRequests.incoming.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No incoming requests</h3>
                  <p className="text-muted-foreground">
                    When organizations request your food donations, they'll appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              mockRequests.incoming.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{request.listingTitle}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Building className="h-4 w-4" />
                          {request.requesterOrg} • {request.requesterName}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                        <span>{request.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{request.pickupTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{request.requesterPhone}</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Message from requester:</p>
                      <p className="text-sm">{request.message}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Requested {formatDateTime(request.requestedAt)}</span>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="flex-1" onClick={() => setSelectedRequest(request)}>
                              <Check className="mr-2 h-4 w-4" />
                              Accept Request
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Accept Pickup Request</DialogTitle>
                              <DialogDescription>
                                Confirm the pickup details with {request.requesterOrg}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="response">Response Message (Optional)</Label>
                                <Textarea
                                  id="response"
                                  placeholder="Add any special instructions or confirm pickup details..."
                                  value={responseMessage}
                                  onChange={(e) => setResponseMessage(e.target.value)}
                                  rows={3}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button onClick={() => handleAcceptRequest(request.id)} className="flex-1">
                                  Confirm Acceptance
                                </Button>
                                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setSelectedRequest(request)}>
                              <X className="mr-2 h-4 w-4" />
                              Decline
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Decline Pickup Request</DialogTitle>
                              <DialogDescription>
                                Let {request.requesterOrg} know why you can't fulfill this request
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="decline-reason">Reason for Declining</Label>
                                <Textarea
                                  id="decline-reason"
                                  placeholder="e.g., Already committed to another organization, timing doesn't work..."
                                  value={responseMessage}
                                  onChange={(e) => setResponseMessage(e.target.value)}
                                  rows={3}
                                  required
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDeclineRequest(request.id, responseMessage)}
                                  className="flex-1"
                                >
                                  Decline Request
                                </Button>
                                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}

                    {request.status === "accepted" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-800 font-medium">Request Accepted</p>
                        <p className="text-sm text-green-700">
                          Pickup confirmed for {request.pickupTime}. Contact: {request.requesterPhone}
                        </p>
                      </div>
                    )}

                    {request.status === "declined" && request.declineReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800 font-medium">Request Declined</p>
                        <p className="text-sm text-red-700">Reason: {request.declineReason}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Outgoing Requests Tab */}
          <TabsContent value="outgoing" className="space-y-4">
            {mockRequests.outgoing.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No outgoing requests</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse available food listings and send pickup requests to donors.
                  </p>
                  <Button asChild>
                    <Link href="/listings">Browse Food Listings</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              mockRequests.outgoing.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{request.listingTitle}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Building className="h-4 w-4" />
                          {request.donorOrg} • {request.donorName}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                        <span>{request.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{request.pickupTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{request.donorPhone}</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Your message:</p>
                      <p className="text-sm">{request.myMessage}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Sent {formatDateTime(request.requestedAt)}</span>
                    </div>

                    {request.status === "pending" && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800 font-medium">Awaiting Response</p>
                        <p className="text-sm text-yellow-700">Your request is pending review by the donor.</p>
                      </div>
                    )}

                    {request.status === "accepted" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                        <p className="text-sm text-green-800 font-medium">Request Accepted!</p>
                        <p className="text-sm text-green-700">Pickup confirmed for {request.pickupTime}</p>
                        {request.pickupAddress && (
                          <div className="flex items-center gap-2 text-sm text-green-700">
                            <MapPin className="h-4 w-4" />
                            <span>{request.pickupAddress}</span>
                          </div>
                        )}
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" asChild>
                            <Link href={`/listings/${request.listingId}/location`}>Get Directions</Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`tel:${request.donorPhone}`}>Call Donor</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
