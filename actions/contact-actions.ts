"use server"

import { connectToDatabase, Contact } from "@/lib/mongodb"
import { revalidatePath } from "next/cache"

export async function submitContactForm(formData: FormData) {
  try {
    await connectToDatabase()

    const newContact = new Contact({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    })

    await newContact.save()
    revalidatePath("/")

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, message: "Failed to send message. Please try again later." }
  }
}

export async function getContacts() {
  try {
    await connectToDatabase()
    const contacts = await Contact.find().sort({ createdAt: -1 })
    return { success: true, data: JSON.parse(JSON.stringify(contacts)) }
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return { success: false, message: "Failed to fetch contacts" }
  }
}

export async function clearDatabase() {
  try {
    await connectToDatabase()
    await Contact.deleteMany({})
    revalidatePath("/admin/dashboard")
    return { success: true, message: "Database cleared successfully" }
  } catch (error) {
    console.error("Error clearing database:", error)
    return { success: false, message: "Failed to clear database" }
  }
}

