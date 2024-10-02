const express = require("express");
const {
  getOnlinePrice,
  createOnlinePrice,
  deleteOnlinePrice,
  updateOnlinePrice,
} = require("../controllers/onlinePriceCtrl");
const isAuthor = require("../utils/isAuthor")
const app = express.Router();
app.route("/").get(isAuthor, getOnlinePrice).post(createOnlinePrice);
app.route("/:id").get(isAuthor, getOnlinePrice).delete(isAuthor, deleteOnlinePrice).put(isAuthor, updateOnlinePrice)
module.exports = app;
