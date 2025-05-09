const express = require("express");
const isAuthor = require("../utils/isAuthor");
const isLogin = require("../utils/isLogin")
const {
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  getAllPostAdmin,
  getAllPost,
} = require("../controllers/postCtrl");
const app = express.Router();
app.route("/").get(getAllPost).post(isAuthor, createPost);
app.route("/admin").get(isAuthor, getAllPostAdmin);
app
  .route("/:id")
  .get(isLogin, getSinglePost)
  .put(isAuthor, updatePost)
  .delete(isAuthor, deletePost);
module.exports = app;
