const asyncHandler = require("express-async-handler");
const { onlinePriceModel } = require("../models/sync");
const { customError } = require("../middlewares/globalError");
const pagination = require("../utils/pagination");
const limit = process.env.LIMIT;
const getOnlinePrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { order, status } = req.query;
  let orderFilter = [];
  let statusFilter = false;
  if (order) {
    const length1 = order.split("-")[0];
    const length2 = order.split("-")[1];
    orderFilter.push(length1);
    orderFilter.push(length2);
  } else {
    orderFilter.push(["createdAt", "DESC"]);
  }
  if (status) {
    statusFilter = status;
  }
  try {
    if (id) {
      const data = await onlinePriceModel.findByPk({ id });
      return { ...data };
    } else {
      const data = await onlinePriceModel.findAll({
        where: { status: statusFilter },
        attributes: ["name", "phone", "subject", "status"],
        offset: (page - 1) * limit,
        limit: limit,
      });
      const paginate = pagination(data.count, page, limit);
      return { ...data, paginate };
    }
  } catch (err) {
    throw customError(err, 400);
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
    return { success: true };
  } catch (err) {
    throw customError(err, 400);
  }
});
const deleteOnlinePrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await onlinePriceModel.findByPk({ id });
    if (!data) {
      throw customError("همچین آیتمی موجود نیست!", 404);
    }
    await data.destroy();
    return { success: true };
  } catch (err) {
    throw customError(err, 400);
  }
});
module.exports = {
  getOnlinePrice,
  createOnlinePrice,
  deleteOnlinePrice,
};
