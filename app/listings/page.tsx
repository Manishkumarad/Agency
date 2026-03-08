"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import { Utensils, Search, MapPin, Clock, Plus, Map } from "lucide-react"

const mockListings = [
  {
    id: 1,
    title: "Fresh Sandwiches & Salads",
    description: "Assorted deli sandwiches and garden salads from lunch service",
    category: "Prepared Meals",
    quantity: "25 servings",
    donor: "Downtown Deli",
    address: "123 Main St, Downtown",
    expiryTime: "6:00 PM today",
    imageUrl: "/fresh-sandwiches-and-salads.jpg",
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
    expiryTime: "8:00 PM today",
    imageUrl: "/fresh-bread-and-pastries.jpg",
    status: "available",
    distance: "1.2 miles",
  },
  {
    id: 3,
    title: "Fresh Produce Mix",
    description: "Slightly imperfect but fresh fruits and vegetables - tomatoes, onions, potatoes, and seasonal greens",
    category: "Fresh Produce",
    quantity: "15 kg",
    donor: "Green Grocer Market",
    address: "789 Pine St, Eastside",
    expiryTime: "Tomorrow 2:00 PM",
    imageUrl: "/fresh-produce-display.png",
    status: "available",
    distance: "2.1 miles",
  },
  {
    id: 4,
    title: "Catered Event Leftovers",
    description: "High-quality catered food from corporate event - pasta, salads, desserts",
    category: "Prepared Meals",
    quantity: "40 servings",
    donor: "Elite Catering Co.",
    address: "321 Business Blvd, Corporate District",
    expiryTime: "9:00 PM today",
    imageUrl: "/catered-food-pasta-salads.jpg",
    status: "claimed",
    distance: "3.5 miles",
  },
  {
    id: 5,
    title: "Authentic Biryani & Curry",
    description: "Surplus chicken biryani, dal makhani, and naan from wedding catering",
    category: "Indian Cuisine",
    quantity: "50 servings",
    donor: "Spice Garden Restaurant",
    address: "567 Curry Lane, Little India",
    expiryTime: "8:00 PM today",
    imageUrl: "/indian-biryani-curry.jpg",
    status: "available",
    distance: "1.5 miles",
  },
  {
    id: 6,
    title: "Fresh Samosas & Chutneys",
    description: "Vegetable and meat samosas with mint and tamarind chutneys from lunch buffet",
    category: "Indian Cuisine",
    quantity: "80 pieces",
    donor: "Mumbai Express",
    address: "234 Spice Street, Downtown",
    expiryTime: "7:00 PM today",
    imageUrl: "/indian-samosas-chutneys.jpg",
    status: "available",
    distance: "0.9 miles",
  },
  {
    id: 7,
    title: "South Indian Dosa & Idli",
    description: "Fresh dosas, idlis, and sambhar from morning service at South Indian restaurant",
    category: "Indian Cuisine",
    quantity: "30 servings",
    donor: "Chennai Kitchen",
    address: "890 Temple Road, Southside",
    expiryTime: "5:00 PM today",
    imageUrl: "/south-indian-dosa-idli.jpg",
    status: "available",
    distance: "2.8 miles",
  },
  {
    id: 8,
    title: "Tandoori Platter Special",
    description: "Tandoori chicken, seekh kebabs, and fresh rotis from evening buffet",
    category: "Indian Cuisine",
    quantity: "35 servings",
    donor: "Royal Tandoor",
    address: "456 Palace Avenue, Midtown",
    expiryTime: "9:30 PM today",
    imageUrl: "/tandoori-platter-special.jpg",
    status: "available",
    distance: "1.7 miles",
  },
  {
    id: 9,
    title: "Vegetarian Thali Meals",
    description: "Complete vegetarian thali with dal, sabzi, rice, and chapati from lunch service",
    category: "Indian Cuisine",
    quantity: "25 thalis",
    donor: "Gujarati Bhavan",
    address: "123 Gandhi Street, Cultural District",
    expiryTime: "6:30 PM today",
    imageUrl: "/vegetarian-thali-meals.jpg",
    status: "available",
    distance: "2.3 miles",
  },
]

const categories = [
  "All Categories",
  "Prepared Meals",
  "Fresh Produce",
  "Baked Goods",
  "Indian Cuisine",
  "Indian Desserts",
  "Dairy",
  "Packaged Foods",
]

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("distance")

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.donor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || listing.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Available Food Listings</h2>
          <p className="text-muted-foreground">Discover surplus food available for pickup in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search food listings, donors, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="time">Pickup Time</SelectItem>
                <SelectItem value="quantity">Quantity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredListings.length} of {mockListings.length} listings
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="aspect-video relative flex-shrink-0">
                <img
                  src={listing.imageUrl || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge
                    variant={listing.status === "available" ? "default" : "secondary"}
                    className={listing.status === "available" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {listing.status === "available" ? "Available" : "Claimed"}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                    <CardDescription className="text-sm text-primary font-medium">{listing.donor}</CardDescription>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {listing.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0 flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-shrink-0">{listing.description}</p>

                <div className="space-y-2 mb-4 flex-shrink-0">
                  <div className="flex items-center gap-2 text-sm">
                    <Utensils className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium">{listing.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span>Pickup by {listing.expiryTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{listing.distance} away</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Button className="flex-1" disabled={listing.status === "claimed"} asChild>
                    <Link href={`/listings/${listing.id}`}>
                      {listing.status === "available" ? "Claim Food" : "View Details"}
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/listings/${listing.id}/location`}>
                      <MapPin className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No listings found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or check back later for new listings.
            </p>
            <Button asChild>
              <Link href="/listings/create">List Your Food</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
