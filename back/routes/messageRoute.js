const express = require("express")
const { getMessage, createMessage, updateMessage, deleteMessage } = require("../controllers/messageCtrl")
const iSAuthor = require("../utils/isAuthor")
const app = express.Router()
app.route("/").get(getMessage)
app.route("/:id").post(createMessage).put(iSAuthor, updateMessage).delete(iSAuthor, deleteMessage)
module.exports = app