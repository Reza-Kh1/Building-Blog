const express = require("express")
const { uploadMediaUser, getAllMedia, deleteMedia, getDBaaS, uploadMediaAdmin, deleteDBaaS } = require("../controllers/mediaCtrl")
const upload = require("../middlewares/upload")
const isAuthor = require("../utils/isAuthor")
const app = express.Router()
app.route("/").post(isAuthor, upload, uploadMediaAdmin).get(getAllMedia).delete(deleteDBaaS)
app.route("/user").post(upload, uploadMediaUser)
app.route("/:id").delete(deleteMedia).get(getDBaaS)
module.exports = app