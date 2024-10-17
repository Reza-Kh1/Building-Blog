const express = require("express");
const isAdmin = require("../utils/isAdmin");
const {
  getAllCategory,
  createCategory,
  getCategoryPosts,
  deleteCategory,
  updateCategory,
  getAllAdminCategory,
} = require("../controllers/categoryCtrl");
const isAuthor = require("../utils/isAuthor");
const app = express();
app.route("/").get(getAllCategory).post(isAuthor, createCategory);
app.get("/admin", isAuthor, getAllAdminCategory);
app
  .route("/:id")
  .get(getCategoryPosts)
  .put(isAuthor, updateCategory)
  .delete(isAuthor, deleteCategory);
module.exports = app;
