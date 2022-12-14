import express from "express"
import mongoose from "mongoose"; mongoose.set('strictQuery', false)
import dotenv from "dotenv"; dotenv.config()
import router from "./router/router.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import errorMiddleware from "./middlewares/errorMiddleware.js"

const PORT = process.env.PORT || 728
const DB_URL = process.env.DB_URL

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use("/api", router)

app.use(errorMiddleware)

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log("PORT: " + PORT))
  } catch (e) {
    console.log('error on start')
  }
}

startApp()
