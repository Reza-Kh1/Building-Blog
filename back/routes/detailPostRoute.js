const express = require("express");
const {
  createDetailPost,
  updateDetailPost,
} = require("../controllers/detailPostCtrl");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
app.post("/", isAuthor, createDetailPost);
app.put("/:id", isAuthor, updateDetailPost);
module.exports = app;
