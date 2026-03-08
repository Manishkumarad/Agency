// Client-side authentication utilities

export interface User {
  id: string
  name: string
  email: string
  userType: "donor" | "receiver"
  organizationName: string
  address: string
  phone: string
  description?: string
  createdAt: string
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  
  try {
    const userStr = localStorage.getItem("user")
    if (!userStr) return null
    return JSON.parse(userStr) as User
  } catch (error) {
    console.error("Error parsing stored user:", error)
    return null
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isAuthenticated") === "true"
}

export function clearAuth(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("user")
  localStorage.removeItem("isAuthenticated")
}

export function setAuth(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem("user", JSON.stringify(user))
  localStorage.setItem("isAuthenticated", "true")
}

