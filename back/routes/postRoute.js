const express = require("express");
const {
  getAllPost,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/postCtrl");
const app = express.Router();
app.route("/").get(getAllPost).post(createPost);
app.route("/:id").get(getSinglePost).put(updatePost).delete(deletePost);
module.exports = app;
