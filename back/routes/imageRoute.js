const express = require("express");
const upload = require("../middlewares/upload");
const {
  getAllImage,
  uploadImage,
  deleteImage,
} = require("../controllers/imageCtrl");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
app
  .route("/")
  .post(isAuthor, upload, uploadImage)
  .delete(isAuthor, deleteImage)
  .get(isAuthor, getAllImage);
module.exports = app;
