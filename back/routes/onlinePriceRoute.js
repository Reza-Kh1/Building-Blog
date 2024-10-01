const express = require("express");
const {
  getOnlinePrice,
  createOnlinePrice,
  deleteOnlinePrice,
} = require("../controllers/onlinePriceCtrl");
const app = express.Router();
app.route("/").get(getOnlinePrice).post(createOnlinePrice);
app.route("/:id").get(getOnlinePrice).delete(deleteOnlinePrice);
module.exports = app;
