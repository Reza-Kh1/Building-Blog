const express = require("express");
const {
  getAllTags,
  createTag,
  deleteTag,
  updateTag,
} = require("../controllers/tagsCtrl");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
app.route("/").get(getAllTags).post(isAuthor,createTag);
app.route("/:id").delete(isAuthor,deleteTag).put(isAuthor,updateTag);
module.exports = app;
