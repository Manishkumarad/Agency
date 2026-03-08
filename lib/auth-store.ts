// Simple in-memory store for demo purposes
// In production, this would be a database

export interface User {
  id: string
  name: string
  email: string
  password: string
  userType: "donor" | "receiver"
  organizationName: string
  address: string
  phone: string
  description?: string
  createdAt: string
}

// In-memory user storage
export const users: User[] = []

// Helper functions
export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export function createUser(userData: Omit<User, "id" | "createdAt">): User {
  const newUser: User = {
    ...userData,
    email: userData.email.toLowerCase().trim(), // Normalize email
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  return newUser
}

export function getUserWithoutPassword(user: User): Omit<User, "password"> {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

