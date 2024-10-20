const asyncHandler = require("express-async-handler");
const { onlinePriceModel } = require("../models/sync");
const { customError } = require("../middlewares/globalError");
const pagination = require("../utils/pagination");
const limit = process.env.LIMIT;
const getOnlinePrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { order, status, page } = req.query;
  if (!page) page = 1;
  let orderFilter = [];
  let statusFilter = {};
  if (order) {
    const length1 = order.split("-")[0];
    const length2 = order.split("-")[1];
    orderFilter.push(length1);
    orderFilter.push(length2);
  } else {
    orderFilter.push(["createdAt", "DESC"]);
  }
  if (status !== undefined) {
    statusFilter.status = status;
  }
  try {
    if (id) {
      const data = await onlinePriceModel.findByPk(id);
      res.send({ data });
    } else {
      const data = await onlinePriceModel.findAndCountAll({
        where: statusFilter,
        attributes: ["name", "phone", "subject", "status", "createdAt", "id"],
        offset: (page - 1) * limit,
        limit: limit,
        order: [orderFilter],
      });
      const paginate = pagination(data.count, page, limit);
      res.send({ ...data, paginate });
    }
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const createOnlinePrice = asyncHandler(async (req, res) => {
  const { name, phone, price, description, subject, images, size, status } =
    req.body;
  try {
    await onlinePriceModel.create({
      name,
      phone,
      price,
      description,
      subject,
      images,
      size,
      status,
    });
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const deleteOnlinePrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await onlinePriceModel.findByPk(id);
    if (!data) {
      throw customError("همچین آیتمی موجود نیست!", 404);
    }
    await data.destroy();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const updateOnlinePrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await onlinePriceModel.findByPk(id);
    data.status = !data.status;
    await data.save();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
module.exports = {
  getOnlinePrice,
  createOnlinePrice,
  deleteOnlinePrice,
  updateOnlinePrice,
};
