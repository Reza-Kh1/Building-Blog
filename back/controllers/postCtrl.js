const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { postModel, detailPostModel, userModel } = require("../models/sync");
const Sequelize = require("sequelize");
const { dataBase } = require("../config/db");
const limit = process.env.LIMIT;

const createPost = asyncHandler(async (req, res) => {
  const { title, image, slug, description, totalComments, status } = req.body;
  if (!title || !slug || !description)
    throw customError("تمام فیلدهای لازم را پر کنید", 401);
  const userId = res.userInfo.id;
  try {
    const data = await postModel.create({
      title,
      image,
      slug,
      description,
      totalComments,
      status,
      userId,
    });
    res.send(data);
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getAllPost = asyncHandler(async (req, res) => {
  let { page, status, title } = req.query;
  page = page || 1;
  try {
    const data = await postModel.findAndCountAll({
      where: {},
      offset: (page - 1) * limit,
      limit: limit,
      order: [["createdAt", "ASC"]],
    });
    res.send({ ...data });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getSinglePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await postModel.findOne({
      where: { slug: id },
      include: [
        { model: detailPostModel, attributes: { exclude: ["id", "postId"] } },
        { model: userModel, attributes: ["name"] },
      ],
      attributes: { exclude: ["userId", "createdAt"] },
    });
    if (!data) throw customError("این صفحه وجود ندارد");
    res.send(data);
  } catch (err) {
    throw customError(err.message, 404);
  }
});
const updatePost = asyncHandler(async (req, res) => {
  const { title, image, slug, description, totalComments, status, categoryId } =
    req.body;
  const { id } = req.params;
  try {
    const updatePost = await postModel.findByPk(id);
    if (!updatePost) return res.status(404).send("همچین پستی وجود ندارد");
    if (title) {
      updatePost.title = title;
    }
    if (image) {
      updatePost.image = image;
    }
    if (slug) {
      updatePost.slug = slug;
    }
    if (description) {
      updatePost.description = description;
    }
    if (totalComments) {
      updatePost.totalComments = totalComments;
    }
    if (status) {
      updatePost.status = status;
    }
    if (categoryId) {
      updatePost.categoryId = categoryId;
    }
    await updatePost.save();
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const t = await dataBase.transaction();
  try {
    const idDetail = await postModel.findByPk(id);
    if (!idDetail) throw customError("پست مورد نظر حذف نشد");
    await idDetail.destroy({ transaction: t });
    await detailPostModel.destroy(
      { where: { id: idDetail.id } },
      { transaction: t }
    );
    await t.commit();
    res.send({ success: true });
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
