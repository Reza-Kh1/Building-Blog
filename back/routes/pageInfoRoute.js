const {
  getPageIfo,
  updatePageInfo,
  getHomePage,
} = require("../controllers/pageInfoCtrl");
const express = require("express");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
app.route("/home-page").get(getHomePage)
app.route("/:id").get(getPageIfo).post(isAuthor, updatePageInfo);
module.exports = app;