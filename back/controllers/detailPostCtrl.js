const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { detailPostModel } = require("../models/sync");
const updateDetailPost = asyncHandler(async (req, res) => {
  const { text, title, keyward, image } = req.body;
  const { id } = req.params;
  try {
    await detailPostModel.update(
      {
        text,
        title,
        keyward,
        image,
      },
      { where: { id } }
    );
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 404);
  }
});
const createDetailPost = asyncHandler(async (req, res) => {
  const { text, title, keyward, image } = req.body;
  const { id } = req.params;
  try {
    await detailPostModel.create({
      text,
      title,
      keyward,
      image,
      postId: id,
    });
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
module.exports = {
  updateDetailPost,
  createDetailPost,
};
