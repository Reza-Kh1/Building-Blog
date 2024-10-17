const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const {
  postModel,
  detailPostModel,
  userModel,
  commentModel,
  categoryModel,
  tagsModel,
} = require("../models/sync");
const { Op } = require("sequelize");
const { dataBase } = require("../config/db");
const pagination = require("../utils/pagination");
const limit = process.env.LIMIT;
const createPost = asyncHandler(async (req, res) => {
  const { title, image, description, status, categoryId, tags } =
    req.body;
  if (!title || !description)
    throw customError("تمام فیلدهای لازم را پر کنید", 401);
  const userId = res.userInfo.id;
  try {
    const dataId = await postModel.create({
      title,
      image,
      description,
      status,
      userId,
      categoryId,
    });
    const newTags = tags?.map(i => i?.id)
    await dataId.addTags(newTags);
    res.send({ id: dataId.id });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getAllPost = asyncHandler(async (req, res, status, isAdmin) => {
  let { search, page, order, tags } = req.query;
  page = page || 1;
  let filter = {};
  let orderFilter = [];
  let tagsArray = []
  let include = [];
  if (tags) tagsArray = tags.split("-");
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
      {
        model: tagsModel,
        attributes: [],
        through: {
          attributes: [],
        },
        where: {
          name: {
            [Op.in]: tagsArray
          }
        },
        required: tagsArray.length ? true : false
      }
    ];
  } else {
    if (tagsArray) {
      include = [
        { model: categoryModel, attributes: ["slug", "name"] },
        {
          model: tagsModel,
          attributes: [],
          through: {
            attributes: [],
          },
          where: {
            name: {
              [Op.in]: tagsArray
            }
          },
          required: tagsArray.length ? true : false
        }];
    } else {
      include = [{ model: categoryModel, attributes: ["slug", "name"] }];
    }
  }
  try {
    const data = await postModel.findAndCountAll({
      where: filter,
      offset: (page - 1) * limit,
      limit: limit,
      order: [orderFilter],
      attributes: { exclude: ["userId", "categoryId"] },
      include: include,
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
      where: { title: id },
      include: [
        {
          model: detailPostModel,
          attributes: { exclude: ["id", "postId"] },
          required: false,
        },
        { model: userModel, attributes: ["name"], required: false },
        {
          model: tagsModel,
          through: {
            attributes: []
          },
          required: false,
        },
        {
          model: categoryModel,
          attributes: ["name", "slug", "id"],
          required: false,
        },
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
  const {
    title,
    image,
    description,
    status,
    categoryId,
    tags,
  } = req.body;
  const { id } = req.params;
  try {
    const updatePost = await postModel.findByPk(id);
    if (!updatePost) return res.status(404).send("همچین پستی وجود ندارد");
    const newTags = tags.map((i) => i.id)
    await updatePost.setTags(newTags);
    if (title) {
      updatePost.title = title;
    }
    updatePost.image = image;
    updatePost.description = description;
    // if (totalComments) {
    //   updatePost.totalComments = totalComments;
    // }
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
    await idDetail.setTags([], { Transaction: t });
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
