const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { commentModel, postModel } = require("../models/sync");
const pagination = require("../utils/pagination");
const token = require("jsonwebtoken");
const { Op } = require("sequelize");
const limit = process.env.LIMIT_COMMENT;
const createComment = asyncHandler(async (req, res) => {
  let { name, text, email, phone, replies, postId, status } = req.body;
  const cookie = req.cookies?.user;
  let tokenUser
  if (cookie) {
    tokenUser = token.verify(cookie, process.env.TOKEN_SECURITY);
  }
  try {
    if (tokenUser && tokenUser?.role !== "USER") {
      status = true;
    }
    if (tokenUser) {
      name = tokenUser.name;
      email = tokenUser.email;
      phone = tokenUser.phone;
    }
    const position = tokenUser ? tokenUser.role : "USER"
    await commentModel.create({
      name,
      text,
      email,
      phone,
      position: position,
      parentId: replies,
      postId,
      status,
    });
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const delComment = await commentModel.findByPk(id);
    if (!delComment) return customError("کامنت مورد نظر یافت نشد", 400);
    await delComment.destroy();
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getSinglePostComment = asyncHandler(async (req, res) => {
  let { page } = req.query;
  const { id } = req.params;
  page = page || 1;
  try {
    const comments = await commentModel.findAndCountAll({
      where: { postId: id === "null" ? null : id, status: true, parentId: null },
      limit: limit,
      offset: (page - 1) * limit,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["email", "phone", "parentId", "status", "postId"],
      },
    });
    for (let i = 0; i < comments.rows.length; i++) {
      comments.rows[i].dataValues.replies = await getReplies(comments.rows[i].id);
    }
    const paginate = pagination(comments.count, page, limit);
    if (id === "null") {
      const countNull = await commentModel.count({ where: { postId: null, status: true } })
      res.send({ comments, paginate, countNull });
      return
    }
    res.send({ comments, paginate });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const updateComment = asyncHandler(async (req, res) => {
  const { name, text, email, phone, status } = req.body;
  const { id } = req.params;
  try {
    const comment = await commentModel.update(
      { name, text, email, phone, status: status || false },
      { where: { id } }
    );
    if (!comment) throw customError("کامنت یافت نشد");
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getAllComment = asyncHandler(async (req, res) => {
  let { status, search, order, page } = req.query;
  page = page || 1;
  let filter = {
    status: status || false,
  };
  let orderFilter = [];
  if (order) {
    const length1 = order.split("-")[0];
    const length2 = order.split("-")[1];
    orderFilter.push(length1);
    orderFilter.push(length2);
  } else {
    orderFilter.push(["createdAt", "DESC"]);
  }
  if (search) {
    filter[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
      { phone: { [Op.iLike]: `%${search}%` } },
      { text: { [Op.iLike]: `%${search}%` } },
    ];
  }
  try {
    const allComment = await commentModel.findAndCountAll({
      where: filter,
      limit,
      offset: (page - 1) * limit,
      order: [orderFilter],
      include: [{ model: postModel, attributes: ["title", "id"] }],
      attributes: { exclude: ["postId"] },
    });
    const paginate = pagination(allComment.count, page, limit);
    res.send({ ...allComment, paginate });
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
  deleteComment,
  getSinglePostComment,
  updateComment,
  createComment,
  getAllComment,
};
