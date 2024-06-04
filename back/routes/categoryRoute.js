const express = require("express");
const isAdmin = require("../utils/isAdmin");
const {
  getAllCategory,
  createCategory,
  getCategoryPosts,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryCtrl");
const app = express();
app.route("/").get(getAllCategory).post(isAdmin, createCategory);
app
  .route("/:id")
  .get(getCategoryPosts)
  .put(isAdmin, updateCategory)
  .delete(isAdmin, deleteCategory);
module.exports = app;
