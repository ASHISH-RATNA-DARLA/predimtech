"use server"

import { connectToDatabase } from "@/lib/mongodb"
import { Career } from "@/models/career"
import { uploadFile, getFileById, deleteFileById } from "@/lib/gridfs"
import { revalidatePath } from "next/cache"

export async function submitCareerForm(formData: FormData) {
  try {
    await connectToDatabase()

    // Get the file from the form data
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, message: "No file uploaded" }
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Create metadata for the file
    const metadata = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      position: formData.get("position"),
      experience: formData.get("experience"),
    }

    // Upload file to GridFS
    const fileId = await uploadFile(buffer, file.name, metadata)

    // Create a new career entry
    const newCareer = new Career({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      position: formData.get("position"),
      experience: formData.get("experience"),
      fileId: fileId,
      fileName: file.name,
      fileSize: file.size,
    })

    await newCareer.save()
    revalidatePath("/career")

    return { success: true, message: "Your CV has been submitted successfully!" }
  } catch (error) {
    console.error("Error submitting career form:", error)
    return { success: false, message: "Failed to submit your CV. Please try again later." }
  }
}

export async function getCareers() {
  try {
    await connectToDatabase()
    const careers = await Career.find().sort({ createdAt: -1 })
    return { success: true, data: JSON.parse(JSON.stringify(careers)) }
  } catch (error) {
    console.error("Error fetching careers:", error)
    return { success: false, message: "Failed to fetch careers" }
  }
}

export async function getCareerFile(fileId: string) {
  try {
    const { file, stream } = await getFileById(fileId)
    return { success: true, file, stream }
  } catch (error) {
    console.error("Error fetching career file:", error)
    return { success: false, message: "Failed to fetch career file" }
  }
}

export async function deleteCareer(careerId: string, fileId: string) {
  try {
    await connectToDatabase()

    // Delete the career entry
    await Career.findByIdAndDelete(careerId)

    // Delete the file from GridFS
    await deleteFileById(fileId)

    revalidatePath("/admin/dashboard")

    return { success: true, message: "Career entry deleted successfully" }
  } catch (error) {
    console.error("Error deleting career:", error)
    return { success: false, message: "Failed to delete career entry" }
  }
}

export async function clearCareersDatabase() {
  try {
    await connectToDatabase()

    // Get all careers to get their fileIds
    const careers = await Career.find()

    // Delete all career entries
    await Career.deleteMany({})

    // Delete all files from GridFS
    for (const career of careers) {
      await deleteFileById(career.fileId)
    }

    revalidatePath("/admin/dashboard")

    return { success: true, message: "Careers database cleared successfully" }
  } catch (error) {
    console.error("Error clearing careers database:", error)
    return { success: false, message: "Failed to clear careers database" }
  }
}

