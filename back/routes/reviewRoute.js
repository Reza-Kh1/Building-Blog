const express = require("express");
const {
  getAllReview,
  getSinglePostReview,
  updateReview,
  createReview,
  deleteReview,
} = require("../controllers/reviewCtrl");
const app = express.Router();
app.route("/").get(getAllReview).post(createReview);
app
  .route("/:id")
  .get(getSinglePostReview)
  .put(updateReview)
  .delete(deleteReview);
module.exports = app;
