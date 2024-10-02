const express = require("express")
const { createMedia, getAllMedia, deleteMedia, getDBaaS } = require("../controllers/mediaCtrl")
const app = express.Router()
app.route("/").post(createMedia).get(getAllMedia)
app.route("/:id").delete(deleteMedia).get(getDBaaS)
module.exports = app