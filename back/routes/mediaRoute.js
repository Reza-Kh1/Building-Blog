const express = require("express")
const { createMedia, getAllMedia, deleteMedia, getAsDataBase } = require("../controllers/mediaCtrl")
const app = express.Router()
app.route("/").post(createMedia).get(getAllMedia)
app.route("/:id").delete(deleteMedia).get(getAsDataBase)
module.exports = app