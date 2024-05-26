const express = require("express");
const { connectDb } = require("../config/db.js");
const { globalHandler, notFound } = require("../middlewares/globalError.js");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const userRoute = require("../routes/user.js");
const path = require("path");

//////////////// setting security api
dotenv.config();
const app = express();
app.use(helmet.xssFilter());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true, // اجازه دادن به درخواست های با credentials
  })
);
app.use("/public", express.static(path.join(__dirname, "../public")));
connectDb();

////////////////// routes api
app.use(process.env.API_VERSION + "user", userRoute);
app.use(globalHandler);
app.use(notFound);
module.exports = app;