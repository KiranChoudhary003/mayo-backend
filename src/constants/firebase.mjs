import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const initializeFirebase = () => {
  try {
    const serviceAccount = JSON.parse(
      readFileSync(path.resolve(__dirname, '../../firebase-adminsdk.json'), 'utf8')
    )

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })

    console.log("Firebase Admin SDK initialized successfully")
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error)
    process.exit(1)
  }
}

export default admin
