import { type NextRequest, NextResponse } from "next/server"
import { getCareerFile } from "@/actions/career-actions"
import { Readable } from "stream"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const fileId = params.id
    const result = await getCareerFile(fileId)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }

    const { file, stream } = result

    // Convert MongoDB stream to Node.js readable stream
    const readable = Readable.from(stream)

    // Create a response with the file stream
    const response = new NextResponse(readable as any)

    // Set appropriate headers
    response.headers.set("Content-Type", file.contentType || "application/octet-stream")
    response.headers.set("Content-Disposition", `attachment; filename="${file.filename}"`)
    response.headers.set("Content-Length", file.length.toString())

    return response
  } catch (error) {
    console.error("Error downloading file:", error)
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 })
  }
}

