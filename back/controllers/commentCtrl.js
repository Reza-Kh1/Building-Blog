const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { commentModel } = require("../models/sync");
const { Op } = require("sequelize");
const pagination = require("../utils/pagination");
const token = require("jsonwebtoken")
const limit = process.env.LIMIT_COMMENT
const createComment = asyncHandler(async (req, res) => {
  let { name, text, email, phone, replies, postId, status } = req.body
  try {
    const cookie = req.cookies?.user;
    const tokenUser = token.verify(cookie, process.env.TOKEN_SECURITY);
    if (tokenUser.role !== "USER") {
      status = true
    }
    if (tokenUser) {
      name = tokenUser.name
      email = tokenUser.email
      phone = tokenUser.phone
    }
    await commentModel.create({
      name, text, email, phone,
      parentId: replies,
      postId, status
    })
    res.send({ success: true })
  } catch (err) {
    throw customError(err.message, 401)
  }
});
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const delComment = await commentModel.destroy({ where: { id } })
    if (!delComment) return customError("کامنت مورد نظر حذف نشد", 400)
    res.send({ success: true })
  } catch (err) {
    throw customError(err.message, 401)
  }
});
const getSinglePostComment = asyncHandler(async (req, res) => {
  let { page } = req.query
  const { id } = req.params
  page = page || 1
  try {
    const comments = await commentModel.findAll({
      where: { postId: id, status: true },
      limit: 10,
      offset: (page - 1) * 10,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["email", "phone", "parentId", "status", "postId"]
      },
    })
    for (let i = 0; i < comments.length; i++) {
      comments[i].dataValues.replies = await getReplies(comments[i].id);
    }
    const paginate = pagination(comments.count, page, 10)
    res.send({ ...comments, paginate })
  } catch (err) {
    throw customError(err.message, 401)
  }
});
const updateComment = asyncHandler(async (req, res) => {
  const { name, text, email, phone } = req.body
  const { id } = req.params
  try {
    const comment = await commentModel.update({ name, text, email, phone }, { where: { id } })
    if (!comment) throw customError("کامنت حذف نشد")
    res.send({ success: true })
  } catch (err) {
    throw customError(err.message, 401)
  }
});
const getAllComment = asyncHandler(async (req, res) => {
  let { status, search, order, page } = req.query
  page = page || 1
  let filter = {
    status: status || false
  }
  let orderFilter = [];
  if (order) {
    orderFilter.push(order.split(","));
  }
  if (search) {
    filter[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
      { phone: { [Op.iLike]: `%${search}%` } },
      { text: { [Op.iLike]: `%${search}%` } },
    ]
  }
  try {
    const allComment = await commentModel.findAndCountAll({
      where: filter,
      limit,
      offset: (page - 1) * limit,
      order: orderFilter || [["createdAt", "DESC"]],
    })
    const paginate = pagination(allComment.count, page, 3)
    res.send({ ...allComment, paginate })
  } catch (err) {
    throw customError(err.message, 401)
  }
});
const getReplies = async (commentId) => {
  const replies = await commentModel.findAll({
    where: { parentId: commentId },
    order: [["createdAt", "ASC"]],
    attributes: { exclude: ["email", "phone", "parentId", "status", "postId"] }
  });
  for (let i = 0; i < replies.length; i++) {
    replies[i].dataValues.replies = await getReplies(replies[i].id);
  }
  return replies;
};
module.exports = {
  deleteComment,
  getSinglePostComment,
  updateComment,
  createComment,
  getAllComment,
};
