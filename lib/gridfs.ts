import mongoose from "mongoose"
import { GridFSBucket } from "mongodb"
import { connectToDatabase } from "./mongodb"

// Global variable to store the GridFS bucket
let gfs: GridFSBucket

// Initialize GridFS bucket
export async function initGridFS() {
  try {
    await connectToDatabase()

    // Create a new bucket with a different name for career uploads
    gfs = new GridFSBucket(mongoose.connection.db, {
      bucketName: "careers",
    })

    return gfs
  } catch (error) {
    console.error("Error initializing GridFS:", error)
    throw error
  }
}

// Get the GridFS bucket
export async function getGridFS() {
  if (!gfs) {
    return await initGridFS()
  }
  return gfs
}

// Upload a file to GridFS
export async function uploadFile(fileBuffer: Buffer, filename: string, metadata: any) {
  const bucket = await getGridFS()

  return new Promise<string>((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      metadata,
    })

    uploadStream.end(fileBuffer, () => {
      resolve(uploadStream.id.toString())
    })

    uploadStream.on("error", (error) => {
      reject(error)
    })
  })
}

// Get a file from GridFS by ID
export async function getFileById(id: string) {
  const bucket = await getGridFS()

  return new Promise<{ file: any; stream: any }>((resolve, reject) => {
    try {
      const _id = new mongoose.Types.ObjectId(id)
      const cursor = bucket.find({ _id })

      cursor.toArray().then((files) => {
        if (!files || files.length === 0) {
          reject(new Error("File not found"))
          return
        }

        const downloadStream = bucket.openDownloadStream(_id)
        resolve({ file: files[0], stream: downloadStream })
      })
    } catch (error) {
      reject(error)
    }
  })
}

// Delete a file from GridFS by ID
export async function deleteFileById(id: string) {
  const bucket = await getGridFS()

  return new Promise<void>((resolve, reject) => {
    try {
      const _id = new mongoose.Types.ObjectId(id)
      bucket.delete(_id, (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      })
    } catch (error) {
      reject(error)
    }
  })
}

// Get all files from GridFS
export async function getAllFiles() {
  const bucket = await getGridFS()

  return new Promise<any[]>((resolve, reject) => {
    bucket.find().toArray((error, files) => {
      if (error) {
        reject(error)
        return
      }
      resolve(files)
    })
  })
}

