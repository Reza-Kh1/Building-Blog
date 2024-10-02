const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { messageModel } = require("../models/sync");
const pagination = require("../utils/pagination");
const limit = process.env.LIMIT_COMMENT;
const createMessage = asyncHandler(async (req, res) => {
  const { name, phone, subject, text } = req.body;
  try {
    const data = await messageModel.create({ name, phone, subject, text });
    console.log(data);

    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const getMessage = asyncHandler(async (req, res) => {
  let { page, status, order } = req.query;
  status = status || false;
  page = page || 1;
  let orderFilter = [];
  if (order) {
    const length1 = order.split("-")[0];
    const length2 = order.split("-")[1];
    orderFilter.push(length1);
    orderFilter.push(length2);
  } else {
    orderFilter.push(["createdAt", "DESC"]);
  }
  try {
    const data = await messageModel.findAndCountAll({
      where: { status: status },
      limit: limit,
      offset: (page - 1) * limit,
      order: [orderFilter],
    });
    const pager = pagination(data.count, page, limit);
    res.send({ ...data, pager });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await messageModel.findByPk(id);
    if (!data) throw customError("آیتم یافت نشد", 404);
    await data.destroy();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const updateMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await messageModel.update({ status: true }, { where: { id } });
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
module.exports = {
  getMessage,
  deleteMessage,
  updateMessage,
  createMessage,
};
