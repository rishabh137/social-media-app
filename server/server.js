import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectDB from "./db/conn.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

connectDB()
app.listen(PORT, () => {
    console.log(`The application start at port ${PORT}`);
})