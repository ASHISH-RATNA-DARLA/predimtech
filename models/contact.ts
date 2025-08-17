import mongoose, { Schema } from "mongoose"

export interface IContact {
  firstName: string
  lastName: string
  email: string
  company?: string
  message: string
  createdAt: Date
}

const ContactSchema = new Schema<IContact>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

// Check if the model is already defined to prevent overwriting during hot reloads
export const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema)

