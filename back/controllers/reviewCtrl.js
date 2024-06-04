const asyncHandler = require("express-async-handler");
const deleteReview = asyncHandler(async (req, res) => {});
const getSinglePostReview = asyncHandler(async (req, res) => {});
const updateReview = asyncHandler(async (req, res) => {});
const createReview = asyncHandler(async (req, res) => {});
const getAllReview = asyncHandler(async (req, res) => {});
module.exports = {
  deleteReview,
  getSinglePostReview,
  updateReview,
  createReview,
  getAllReview,
};
