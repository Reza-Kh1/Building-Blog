const express = require("express")
const { uploadMediaUser, getAllMedia, deleteMedia, getDBaaS, uploadMediaAdmin, deleteDBaaS } = require("../controllers/mediaCtrl")
const upload = require("../middlewares/upload")
const isAuthor = require("../utils/isAuthor")
const app = express.Router()
app.route("/").post(isAuthor, upload, uploadMediaAdmin).get(isAuthor, getAllMedia).delete(isAuthor, deleteDBaaS)
app.route("/user").post(upload, uploadMediaUser)
app.route("/:id").delete(isAuthor, deleteMedia).get(isAuthor, getDBaaS)
module.exports = app