import mongoose, { Schema } from "mongoose"

export interface ICareer {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  experience: string
  fileId: string
  fileName: string
  fileSize: number
  createdAt: Date
}

const CareerSchema = new Schema<ICareer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  fileId: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

// Check if the model is already defined to prevent overwriting during hot reloads
export const Career = mongoose.models.Career || mongoose.model<ICareer>("Career", CareerSchema)

