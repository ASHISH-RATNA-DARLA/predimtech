import mongoose from "mongoose"
import bcrypt from "bcryptjs"

// Hardcoded MongoDB URI - replace with your actual connection string
const MONGODB_URI =
  "mongodb+srv://ashish:qwerty789@ashish.ifdrgkd.mongodb.net/?retryWrites=true&w=majority&appName=Ashish"

// Hardcoded JWT secret
export const JWT_SECRET = "predimtech_secure_jwt_secret_key_change_in_production"

// Global variable to track connection status
let isConnected = false

export async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing database connection")
    return mongoose.connection
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    })

    isConnected = !!db.connections[0].readyState
    console.log("New database connection established")

    return mongoose.connection
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    isConnected = false
    throw new Error(`Failed to connect to database: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Define the Contact submission schema
const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Initialize the Contact model
export const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema)

// User schema
export interface IUser {
  username: string
  password: string
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// Add a method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

