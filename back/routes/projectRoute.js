const express = require("express")
const app = express.Router()
const { getAllProject, createProject, getProject, updateProject, deleteProject } = require("../controllers/projectCtrl")
const isAuthor = require("../utils/isAuthor")
app.route("/").get(getAllProject).post(isAuthor, createProject)
app.route("/:id").get(getProject).put(isAuthor, updateProject).delete(isAuthor, deleteProject)
module.exports = app