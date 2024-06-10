const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { postModel, detailPostModel, userModel } = require("../models/sync");
const { Op } = require("sequelize");
const { dataBase } = require("../config/db");
const pagination = require("../utils/pagination");
const limit = process.env.LIMIT;
const createPost = asyncHandler(async (req, res) => {
  const { title, image, slug, description, status, categoryId } = req.body;
  if (!title || !slug || !description)
    throw customError("تمام فیلدهای لازم را پر کنید", 401);
  const userId = res.userInfo.id;
  try {
    await postModel.create({
      title,
      image,
      slug,
      description,
      status,
      userId, categoryId
    });
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getAllPost = asyncHandler(async (req, res, status, isAdmin) => {
  let { search, page, order } = req.query;
  page = page || 1;
  let filter = {};
  let orderFilter = [];
  if (order) {
    orderFilter.push(order.split(","));
  }
  if (isAdmin && status) {
    filter.status = status;
  }
  if (!isAdmin) {
    filter.status = true;
  }
  if (search) {
    filter[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
      { keycode: { [Op.iLike]: `%${search}%` } },
    ];
  }
  try {
    const data = await postModel.findAndCountAll({
      where: filter,
      offset: (page - 1) * limit,
      limit: limit,
      order: orderFilter || [["createdAt", "DESC"]],
    });
    const paginate = pagination(data.count, page, limit)
    res.send({ data, paginate });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getAllPostAdmin = asyncHandler(async (req, res) => {
  const { status } = req.query;
  getAllPost(req, res, status, true);
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
  getAllPost,
  deletePost,
  getSinglePost,
  updatePost,
  createPost,
  getAllPostAdmin,
};
