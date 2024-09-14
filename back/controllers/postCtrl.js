const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const {
  postModel,
  detailPostModel,
  userModel,
  commentModel,
  categoryModel,
} = require("../models/sync");
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
    const dataId = await postModel.create({
      title,
      image,
      slug,
      description,
      status,
      userId,
      categoryId,
    });
    res.send({ id: dataId.id });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getAllPost = asyncHandler(async (req, res, status, isAdmin) => {
  let { search, page, order } = req.query;
  page = page || 1;
  let filter = {};
  let orderFilter = [];
  let include = []
  if (order) {
    const length1 = order.split("-")[0];
    const length2 = order.split("-")[1];
    orderFilter.push(length1);
    orderFilter.push(length2);
  } else {
    orderFilter.push(["createdAt", "DESC"]);
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
    ];
  }
  if (isAdmin) {
    include = [
      { model: categoryModel, attributes: ["slug", "name"] },
      { model: userModel, attributes: ["name"] },
    ]
  } else {
    include = [
      { model: categoryModel, attributes: ["slug", "name"] },
    ]
  }
  try {
    const data = await postModel.findAndCountAll({
      where: filter,
      offset: (page - 1) * limit,
      limit: limit,
      order: [orderFilter],
      attributes: { exclude: ["userId", "createdAt", "categoryId"] },
      include: include
    });
    const paginate = pagination(data.count, page, limit);
    res.send({ ...data, paginate });
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
        { model: detailPostModel, attributes: { exclude: ["id", "postId"] }, required: false },
        { model: userModel, attributes: ["name"], required: false },
        { model: categoryModel, attributes: ["name", "slug", "id"], required: false },
        {
          model: commentModel,
          where: { parentId: null, status: true },
          limit: process.env.LIMIT_COMMENT,
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: [
              "email",
              "phone",
              "parentId",
              "status",
              "postId",
              "categoryId",
            ],
          },
        },
      ],
      attributes: { exclude: ["userId", "createdAt", "categoryId"] },
    });
    if (!data) throw customError("این صفحه وجود ندارد");
    for (let i = 0; i < data.dataValues.Comments.length; i++) {
      data.dataValues.Comments[i].dataValues.replies = await getReplies(
        data.dataValues.Comments[i].id
      );
    }
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
    updatePost.status = status || false;
    if (categoryId) {
      updatePost.categoryId = categoryId;
    }
    updatePost.userId = res.userInfo.id;
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
const getReplies = async (commentId) => {
  const replies = await commentModel.findAll({
    where: { parentId: commentId, status: true },
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["email", "phone", "parentId", "status", "postId"] },
  });
  for (let i = 0; i < replies.length; i++) {
    replies[i].dataValues.replies = await getReplies(replies[i].id);
  }
  return replies;
};
module.exports = {
  getAllPost,
  deletePost,
  getSinglePost,
  updatePost,
  createPost,
  getAllPostAdmin,
};
