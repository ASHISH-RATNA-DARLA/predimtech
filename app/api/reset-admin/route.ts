import { connectToDatabase, User } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    await connectToDatabase()

    // Delete all existing admin users
    await User.deleteMany({})

    // Create new admin user with correct credentials
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash("20000", salt)

    const admin = new User({
      username: "Pradeep",
      password: hashedPassword,
    })

    await admin.save()

    return NextResponse.json({
      success: true,
      message: "Admin user reset successfully",
    })
  } catch (error) {
    console.error("Error resetting admin user:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to reset admin user",
      },
      { status: 500 },
    )
  }
}

