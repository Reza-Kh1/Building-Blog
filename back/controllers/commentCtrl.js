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
    if (tokenUser?.role !== "USER") {
      const post = await postModel.findByPk(postId);
      post.totalComments = Number(post.totalComments) + 1;
      post.save();
      status = true;
    }
    if (tokenUser) {
      name = tokenUser.name;
      email = tokenUser.email;
      phone = tokenUser.phone;
    }
    await commentModel.create({
      name,
      text,
      email,
      phone,
      parentId: replies,
      postId,
      status,
    });
    res.send({ success: true });
  } catch (err) {
    console.log("ok");

    throw customError(err.message, 401);
  }
});
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const delComment = await commentModel.findByPk(id);
    if (!delComment) return customError("کامنت مورد نظر یافت نشد", 400);
    const post = await postModel.findByPk(delComment.postId);
    post.totalComments = Number(post.totalComments) - 1;
    post.save();
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
    const comments = await commentModel.findAll({
      where: { postId: id, status: true, parentId: null },
      limit: limit,
      offset: (page - 1) * limit,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["email", "phone", "parentId", "status", "postId"],
      },
    });
    for (let i = 0; i < comments.length; i++) {
      comments[i].dataValues.replies = await getReplies(comments[i].id);
    }
    const paginate = pagination(comments.count, page, limit);
    res.send({ comments, paginate });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const updateComment = asyncHandler(async (req, res) => {
  const { name, text, email, phone, status, postId } = req.body;
  const { id } = req.params;
  try {
    if (status) {
      const post = await postModel.findByPk(postId);
      console.log(post);
      post.totalComments = Number(post.totalComments) + 1;
      post.save();
    }
    if (status === false) {
      const post = await postModel.findByPk(postId);
      post.totalComments = Number(post.totalComments) - 1;
      post.save();
    }
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
      include: [{ model: postModel, attributes: ["id"] }],
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
