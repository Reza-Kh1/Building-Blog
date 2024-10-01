const express = require("express");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
const {
  createWorker,
  deleteWorker,
  getAllWorker,
  getWorker,
  updateWorker,
} = require("../controllers/workerCtrl");
app.route("/").get(getAllWorker).post(isAuthor, createWorker);
app
  .route("/:id")
  .get(getWorker)
  .put(isAuthor, updateWorker)
  .delete(deleteWorker);
module.exports = app;
