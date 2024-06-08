const express = require("express");
const {
  createDetailPost,
  updateDetailPost,
} = require("../controllers/detailPostCtrl");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
app
  .route("/:id")
  .post(isAuthor, createDetailPost)
  .put(isAuthor, updateDetailPost);
module.exports = app;
