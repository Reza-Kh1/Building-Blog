const express = require("express")
const app = express.Router()
const { getAllProject, createProject, getProject, updateProject, deleteProject } = require("../controllers/projectCtrl")
const isAuthor = require("../utils/isAuthor")
const isLogin = require("../utils/isLogin")
app.route("/").get(isLogin, getAllProject).post(isAuthor, createProject)
app.route("/:name").get(isLogin, getProject)
app.route("/:id").put(isAuthor, updateProject).delete(isAuthor, deleteProject)
module.exports = app