const express = require("express");
const isAuthor = require("../utils/isAuthor");
const app = express.Router();
const {
  createWorker,
  deleteWorker,
  getAllWorker,
  getWorker,
  updateWorker,
  getAllWorkerName,
} = require("../controllers/workerCtrl");
app.route("/").get(getAllWorker).post(isAuthor, createWorker);
app.route("/name-worker").get(getAllWorkerName);
app
  .route("/:id")
  .get(getWorker)
  .put(isAuthor, updateWorker)
  .delete(isAuthor, deleteWorker);

module.exports = app;
