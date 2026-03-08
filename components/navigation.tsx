"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Utensils, LogOut, User, Menu } from "lucide-react"
import { getStoredUser, isAuthenticated, clearAuth } from "@/lib/auth"

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [isAuth, setIsAuth] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkAuth = () => {
      const authStatus = isAuthenticated()
      const userData = getStoredUser()
      setIsAuth(authStatus)
      setUser(userData)
    }
    checkAuth()

    // Listen for storage changes (in case user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth()
    }
    window.addEventListener("storage", handleStorageChange)
    
    // Also check auth state when pathname changes (in case of same-tab navigation)
    checkAuth()
    
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [pathname])

  const handleLogout = () => {
    clearAuth()
    setIsAuth(false)
    setUser(null)
    toast.success("Logged out successfully")
    router.push("/")
  }

  // Don't show navigation on login/register pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Utensils className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">RePlate</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/listings">
              <Button variant="outline">Browse Food</Button>
            </Link>
            <Link href="/map">
              <Button variant="outline">Map</Button>
            </Link>
            <Link href="/requests">
              <Button variant="outline">Requests</Button>
            </Link>
            {isAuth && user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{user.name}</span>
                </div>
                <Button variant="outline" onClick={handleLogout} title="Logout">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

