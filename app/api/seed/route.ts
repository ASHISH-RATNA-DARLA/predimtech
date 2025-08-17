import { createInitialAdmin } from "@/actions/auth-actions"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await createInitialAdmin()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in seed route:", error)
    return NextResponse.json({ success: false, message: "Failed to seed database" }, { status: 500 })
  }
}

