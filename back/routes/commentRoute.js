const express = require("express");
const { getAllComment, createComment, deleteComment, getSinglePostComment, updateComment } = require("../controllers/commentCtrl");
const isAuthor = require("../utils/isAuthor")
const app = express.Router();
app.route("/").get(getAllComment).post(createComment);
app
  .route("/:id")
  .get(getSinglePostComment)
  .put(isAuthor, updateComment)
  .delete(isAuthor, deleteComment);
module.exports = app;
