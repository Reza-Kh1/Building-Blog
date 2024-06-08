const express = require("express");
const isAuthor = require("../utils/isAuthor");
const {
  getAllPost,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/postCtrl");
const app = express.Router();
app.route("/").get(getAllPost).post(isAuthor, createPost);
app
  .route("/:id")
  .get(getSinglePost)
  .put(isAuthor, updatePost)
  .delete(isAuthor, deletePost);
module.exports = app;