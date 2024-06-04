const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { postModel, detailPost } = require("../models/sync");
const limit = process.env.LIMIT;
const createPost = asyncHandler(async (req, res) => {
  const { title, image, slug, description, totalComments, status } = req.body;
  if (!title || !slug || !description)
    throw customError("تمام فیلدهای لازم را پر کنید", 401);
  try {
    const data = await postModel.create({
      title,
      image,
      slug,
      description,
      totalComments,
      status,
    });
    res.send({ data });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getAllPost = asyncHandler(async (req, res) => {
  try {
    const data = await postModel.findAndCountAll();
    res.send({ data });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getSinglePost = asyncHandler(async (req, res) => {
  try {
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const updatePost = asyncHandler(async (req, res) => {
  try {
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findByPk(id, {
      include: [{ model: detailPost, attributes: ["id"] }],
    });
    
  } catch (err) {
    throw customError(err.message, 401);
  }
});
module.exports = {
  deletePost,
  getSinglePost,
  updatePost,
  createPost,
  getAllPost,
};
