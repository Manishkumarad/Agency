import { NextRequest, NextResponse } from "next/server"
import { findUserByEmail, createUser, getUserWithoutPassword, users } from "@/lib/auth-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { name, email, password, confirmPassword, userType, organizationName, address, phone, description } = body

    // Normalize email (trim whitespace and convert to lowercase)
    email = email?.trim().toLowerCase()
    password = password?.trim()
    confirmPassword = confirmPassword?.trim()

    // Validation
    if (!name || !email || !password || !confirmPassword || !userType || !organizationName || !address || !phone) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = createUser({
      name,
      email,
      password, // In production, this should be hashed
      userType: userType as "donor" | "receiver",
      organizationName,
      address,
      phone,
      description: description || "",
    })

    console.log("User registered successfully:", email)
    console.log("Total users in store:", users.length)

    // Return user data (without password)
    const userWithoutPassword = getUserWithoutPassword(newUser)

    return NextResponse.json(
      {
        message: "Registration successful",
        user: userWithoutPassword,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET endpoint to retrieve users (for debugging - remove in production)
export async function GET() {
  const { users } = await import("@/lib/auth-store")
  return NextResponse.json({ users: users.map((user) => getUserWithoutPassword(user)) })
}

