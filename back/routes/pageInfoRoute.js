const {
  getPageIfo,
  createPageInfo,
  updatePageInfo,
} = require("../controllers/pageInfoCtrl");
const express = require("express");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
app.post("/", isAuthor, createPageInfo);
app.route("/:id").get(getPageIfo).put(updatePageInfo);
module.exports = app;