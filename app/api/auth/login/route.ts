import { NextRequest, NextResponse } from "next/server"
import { findUserByEmail, getUserWithoutPassword, users } from "@/lib/auth-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { email, password } = body

    // Normalize email (trim whitespace and convert to lowercase)
    email = email?.trim().toLowerCase()
    password = password?.trim()

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Debug: Log current users (remove in production)
    console.log("Current users in store:", users.length)
    console.log("Attempting login for email:", email)
    if (users.length > 0) {
      console.log("Registered emails:", users.map(u => u.email))
    }

    // Find user by email
    const user = findUserByEmail(email)

    if (!user) {
      console.log("User not found for email:", email)
      return NextResponse.json({ 
        error: "No account found with this email. Please register first." 
      }, { status: 401 })
    }

    // In production, compare hashed password using bcrypt or similar
    if (user.password !== password) {
      console.log("Password mismatch for user:", email)
      return NextResponse.json({ 
        error: "Incorrect password. Please try again." 
      }, { status: 401 })
    }

    // Return user data (without password)
    const userWithoutPassword = getUserWithoutPassword(user)

    console.log("Login successful for user:", email)

    return NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

