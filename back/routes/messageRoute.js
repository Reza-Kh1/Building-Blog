const express = require("express");
const {
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageCtrl");
const iSAuthor = require("../utils/isAuthor");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
app.route("/").get(isAuthor, getMessage).post(createMessage);
app.route("/:id").put(iSAuthor, updateMessage).delete(iSAuthor, deleteMessage);
module.exports = app;
