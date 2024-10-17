const {
  getPageIfo,
  updatePageInfo,
} = require("../controllers/pageInfoCtrl");
const express = require("express");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
app.route("/:id").get(isAuthor,getPageIfo).post(isAuthor, updatePageInfo);
module.exports = app;