const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const updateDetailPost = asyncHandler(async (req, res) => {
  try {
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const createDetailPost = asyncHandler(async (req, res) => {
  try {
  } catch (err) {
    throw customError(err.message, 401);
  }
});
module.exports = {
  updateDetailPost,
  createDetailPost,
};
