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
const pageInfo = require("../routes/pageInfoRoute.js");
const onlinePrice = require("../routes/onlinePriceRoute.js");
const worker = require("../routes/workerRoute.js");
const path = require("path");
const cookieParser = require("cookie-parser");
const message = require("../routes/messageRoute.js");
const project = require("../routes/projectRoute.js");
const media = require("../routes/mediaRoute.js");
const tags = require("../routes/tagRoute.js");
const backUp = require("../routes/backupRoute.js");

//////////////// setting security api
dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(helmet.xssFilter());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
connectDb();
////////////////// routes api
app.use(process.env.API_VERSION + "user", userRoute);
app.use(process.env.API_VERSION + "category", categoryRoute);
app.use(process.env.API_VERSION + "post", postRoute);
app.use(process.env.API_VERSION + "comment", commentRoute);
app.use(process.env.API_VERSION + "detail", detailPost);
app.use(process.env.API_VERSION + "page", pageInfo);
app.use(process.env.API_VERSION + "onlineprice", onlinePrice);
app.use(process.env.API_VERSION + "worker", worker);
app.use(process.env.API_VERSION + "message", message);
app.use(process.env.API_VERSION + "project", project);
app.use(process.env.API_VERSION + "media", media);
app.use(process.env.API_VERSION + "tag", tags);
app.use(process.env.API_VERSION + "backUp", backUp);
app.use(globalHandler);
app.use(notFound);
module.exports = app;
