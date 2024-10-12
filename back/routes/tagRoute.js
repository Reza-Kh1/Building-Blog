const express = require("express");
const {
  getAllTags,
  createTag,
  deleteTag,
  updateTag,
} = require("../controllers/tagsCtrl");
const app = express.Router();
app.route("/").get(getAllTags).post(createTag);
app.route("/:id").delete(deleteTag).put(updateTag);
module.exports = app;
