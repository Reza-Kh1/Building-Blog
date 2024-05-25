import express from "express"
import { connectDb } from "../Config/db.js"
const app = express()

app.get("/", (req, res) => {
    res.send({ ok })
})
connectDb()
export default app