const express = require("express");
const { getAllComment, createComment, deleteComment, getSinglePostComment, updateComment } = require("../controllers/commentCtrl");
const isAuthor = require("../utils/isAuthor")
const app = express.Router();
app.route("/").get(isAuthor, getAllComment).post(createComment);
app
  .route("/:id")
  .get(isAuthor, getSinglePostComment)
  .put(isAuthor, updateComment)
  .delete(isAuthor, deleteComment);
module.exports = app;
