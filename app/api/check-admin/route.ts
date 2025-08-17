import { connectToDatabase, User } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()

    // Find all admin users (for diagnostic purposes)
    const adminUsers = await User.find({}, { username: 1, _id: 0 })

    return NextResponse.json({
      success: true,
      message: "Admin users found",
      count: adminUsers.length,
      users: adminUsers,
    })
  } catch (error) {
    console.error("Error checking admin users:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to check admin users",
      },
      { status: 500 },
    )
  }
}

