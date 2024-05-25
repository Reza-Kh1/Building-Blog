import express from "express"
import { connectDb } from "../Config/db.js"
import { globalHandler, notFound } from "../Middlewares/errorHandler.js"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import userRoute from "../Routes/userRoute.js"
import { fileURLToPath } from "url"
import path from "path"



//////////////// setting security api
dotenv.config()
const app = express()
app.use(helmet.xssFilter())
app.use(express.json())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true, // اجازه دادن به درخواست های با credentials
    })
)
app.use("/public", express.static(path.join(__dirname, "../public")));
connectDb()

////////////////// routes api
app.use(process.env.API_VERSION + "user", userRoute)
app.use(globalHandler)
app.use(notFound)
export default app