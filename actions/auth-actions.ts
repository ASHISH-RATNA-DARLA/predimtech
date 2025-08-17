"use server"

import { connectToDatabase, User, JWT_SECRET } from "@/lib/mongodb"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function login(formData: FormData) {
  try {
    await connectToDatabase()

    const username = formData.get("username") as string
    const password = formData.get("password") as string

    // Make username search case-insensitive
    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    })

    if (!user) {
      console.log(`No user found with username: ${username}`)
      return { success: false, message: "Invalid credentials" }
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      console.log(`Password mismatch for user: ${username}`)
      return { success: false, message: "Invalid credentials" }
    }

    // Create JWT token
    const token = jwt.sign({ username: user.username, id: user._id.toString() }, JWT_SECRET, { expiresIn: "24h" })

    // Set cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return { success: true, message: "Login successful" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

export async function logout() {
  cookies().delete("auth-token")
  return { success: true }
}

export async function getSession() {
  try {
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return null
    }

    const verified = jwt.verify(token, JWT_SECRET)
    return verified
  } catch (error) {
    return null
  }
}

export async function createInitialAdmin() {
  try {
    await connectToDatabase()

    // Check if admin already exists
    const adminExists = await User.findOne({
      username: { $regex: /^Pradeep$/i },
    })

    if (adminExists) {
      return { success: true, message: "Admin user already exists" }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash("20000", salt)

    // Create admin user
    const admin = new User({
      username: "Pradeep",
      password: hashedPassword,
    })

    await admin.save()
    return { success: true, message: "Admin user created successfully" }
  } catch (error) {
    console.error("Error creating admin user:", error)
    return { success: false, message: "Failed to create admin user" }
  }
}

