const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { detailPostModel, postModel } = require("../models/sync");
const updateDetailPost = asyncHandler(async (req, res) => {
  const { text, title, keyword } = req.body;
  const { id } = req.params;
  try {
    const post = await postModel.findByPk(id, {
      include: [{ model: detailPostModel, attributes: ["id"] }],
      attributes: ["id"],
    });
    if (!post) throw customError("خطا در ارتباط با دیتابیس");
    await detailPostModel.update(
      {
        text,
        title,
        keyword,
      },
      { where: { id: post.DetailPost.id } }
    );
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 404);
  }
});
const createDetailPost = asyncHandler(async (req, res) => {
  const { text, title, keyword } = req.body;
  const { id } = req.params;
  try {
    await detailPostModel.create({
      text,
      title,
      keyword,
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
