"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/navigation"
import { Utensils, Search, MapPin, Clock, Navigation as NavIcon, Filter, List, Layers, Plus } from "lucide-react"

// Mock data with coordinates for map display
const mockListings = [
  {
    id: 1,
    title: "Fresh Sandwiches & Salads",
    description: "Assorted deli sandwiches and garden salads from lunch service",
    category: "Prepared Meals",
    quantity: "25 servings",
    donor: "Downtown Deli",
    address: "123 Main St, Downtown",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    expiryTime: "6:00 PM today",
    status: "available",
    distance: "0.8 miles",
  },
  {
    id: 2,
    title: "Day-Old Bread & Pastries",
    description: "Fresh baked goods from yesterday - breads, croissants, and muffins",
    category: "Baked Goods",
    quantity: "3 large bags",
    donor: "Sunrise Bakery",
    address: "456 Oak Ave, Midtown",
    coordinates: { lat: 40.7505, lng: -73.9934 },
    expiryTime: "8:00 PM today",
    status: "available",
    distance: "1.2 miles",
  },
  {
    id: 3,
    title: "Fresh Produce Mix",
    description: "Slightly imperfect but fresh fruits and vegetables",
    category: "Fresh Produce",
    quantity: "15 kg",
    donor: "Green Grocer Market",
    address: "789 Pine St, Eastside",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    expiryTime: "Tomorrow 2:00 PM",
    status: "available",
    distance: "2.1 miles",
  },
  {
    id: 4,
    title: "Catered Event Leftovers",
    description: "High-quality catered food from corporate event",
    category: "Prepared Meals",
    quantity: "40 servings",
    donor: "Elite Catering Co.",
    address: "321 Business Blvd, Corporate District",
    coordinates: { lat: 40.7549, lng: -73.984 },
    expiryTime: "9:00 PM today",
    status: "claimed",
    distance: "3.5 miles",
  },
]

const categories = ["All Categories", "Prepared Meals", "Fresh Produce", "Baked Goods", "Dairy", "Packaged Foods"]

export default function MapPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedListing, setSelectedListing] = useState<(typeof mockListings)[0] | null>(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied:", error)
          // Fallback to NYC coordinates
          setUserLocation({ lat: 40.7589, lng: -73.9851 })
        },
      )
    }
  }, [])

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.donor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || listing.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    const colors = {
      "Prepared Meals": "#164e63", // Primary cyan
      "Fresh Produce": "#16a34a", // Green
      "Baked Goods": "#d97706", // Amber
      Dairy: "#7c3aed", // Purple
      "Packaged Foods": "#dc2626", // Red
    }
    return colors[category as keyof typeof colors] || "#6b7280"
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="z-10">
        <Navigation />
      </div>

      <div className="flex-1 flex relative">
        {/* Sidebar */}
        <div
          className={`${showSidebar ? "w-96" : "w-0"} transition-all duration-300 overflow-hidden bg-card border-r border-border flex flex-col`}
        >
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Food Map</h2>

            {/* Search and Filters */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredListings.length} of {mockListings.length} listings
            </div>
          </div>

          {/* Listings List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredListings.map((listing) => (
              <Card
                key={listing.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedListing?.id === listing.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedListing(listing)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm line-clamp-1">{listing.title}</CardTitle>
                      <CardDescription className="text-xs text-primary font-medium">{listing.donor}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant={listing.status === "available" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {listing.status === "available" ? "Available" : "Claimed"}
                      </Badge>
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: getCategoryColor(listing.category) }}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Utensils className="h-3 w-3" />
                      <span>{listing.quantity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{listing.expiryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{listing.distance} away</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Mock Map Interface */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-gray-300" />
                ))}
              </div>
            </div>

            {/* Street Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#cbd5e1" strokeWidth="2" />
            </svg>

            {/* Map Markers */}
            {filteredListings.map((listing, index) => {
              const x = 20 + ((index * 15) % 60)
              const y = 20 + ((index * 20) % 60)
              const isSelected = selectedListing?.id === listing.id

              return (
                <div
                  key={listing.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
                    isSelected ? "scale-125 z-10" : "z-5"
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setSelectedListing(listing)}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-3 border-white shadow-lg flex items-center justify-center ${
                      listing.status === "available" ? "animate-pulse" : "opacity-60"
                    }`}
                    style={{ backgroundColor: getCategoryColor(listing.category) }}
                  >
                    <Utensils className="h-3 w-3 text-white" />
                  </div>
                  {isSelected && (
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-48 border border-border">
                      <div className="text-sm font-medium text-foreground">{listing.title}</div>
                      <div className="text-xs text-muted-foreground">{listing.donor}</div>
                      <div className="text-xs text-muted-foreground mt-1">{listing.quantity}</div>
                      <Button size="sm" className="w-full mt-2" asChild>
                        <Link href={`/listings/${listing.id}`}>View Details</Link>
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}

            {/* User Location Marker */}
            {userLocation && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: "50%", top: "50%" }}
              >
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Your Location
                </div>
              </div>
            )}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
              <Layers className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
              <NavIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          <Card className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Legend</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-xs">
                {categories.slice(1).map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    />
                    <span className="text-muted-foreground">{category}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border border-white shadow-sm" />
                  <span className="text-muted-foreground">Your Location</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
