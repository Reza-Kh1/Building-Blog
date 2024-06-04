const express = require("express");
const uploadImage = require("../middlewares/upload");
const {
  getAllImage,
  createImage,
  deleteImage,
} = require("../controllers/imageCtrl");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
app
  .route("/")
  .post(isAuthor, uploadImage, createImage)
  .get(isAuthor, getAllImage);
app.route("/:id").delete(deleteImage);
module.exports = app;
