const express = require("express");
const { connectDb } = require("../config/db.js");
const { globalHandler, notFound } = require("../middlewares/globalError.js");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const userRoute = require("../routes/userRoute.js");
const categoryRoute = require("../routes/categoryRoute.js");
const postRoute = require("../routes/postRoute.js");
const commentRoute = require("../routes/commentRoute.js");
const detailPost = require("../routes/detailPostRoute.js");
const imagePost = require("../routes/imageRoute.js");
const path = require("path");
const cookieParser = require("cookie-parser");

//////////////// setting security api
dotenv.config();
const app = express();
app.use(helmet.xssFilter());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use("/public", express.static(path.join(__dirname, "../public")));
connectDb();

////////////////// routes api
app.use(process.env.API_VERSION + "user", userRoute);
app.use(process.env.API_VERSION + "category", categoryRoute);
app.use(process.env.API_VERSION + "post", postRoute);
app.use(process.env.API_VERSION + "comment", commentRoute);
app.use(process.env.API_VERSION + "detail", detailPost);
app.use(process.env.API_VERSION + "image", imagePost);

app.use(globalHandler);
app.use(notFound);
module.exports = app;
