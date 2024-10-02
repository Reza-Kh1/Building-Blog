const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const workerModel = require("../models/workerModel");
const pagination = require("../utils/pagination");
const { Op } = require("sequelize");
const limit = process.env.LIMIT;
const getWorker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await workerModel.findByPk(id);
    res.send({ data });
  } catch (err) {
    throw customError(err, 400);
  }
});
const getAllWorker = asyncHandler(async (req, res) => {
  let { search, page, order } = req.query;
  page = page || 1;
  let filter = {};
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
      { phone: { [Op.iLike]: `%${search}%` } },
    ];
  }
  try {
    const data = await workerModel.findAndCountAll({
      where: filter,
      offset: (page - 1) * limit,
      limit: limit,
      order: [orderFilter],
      attributes: { exclude: ["socialMedia", "address", "description","updatedAt"] },
    });
    const paginate = pagination(data.count, page, limit);
    res.send({ ...data, paginate });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const createWorker = asyncHandler(async (req, res) => {
  const { name, phone, socialMedia, address, description, image } = req.body;
  try {
    await workerModel.create({
      name,
      phone,
      socialMedia,
      address,
      description,
      image,
    });
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const updateWorker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone, socialMedia, address, description, image } = req.body;
  try {
    const data = await workerModel.findByPk(id);
    if (!data) throw customError("همچین آیتمی وجود ندارد", 404);
    if (name) {
      data.name = name;
    }
    if (phone) {
      data.phone = phone;
    }
    if (socialMedia) {
      data.socialMedia = socialMedia;
    }
    if (address) {
      data.address = address;
    }
    if (description) {
      data.description = description;
    }
    if (image) {
      data.image = image;
    }
    await data.save();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const deleteWorker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await workerModel.findByPk(id);
    if (!data) throw customError("همچین آیتمی وجود ندارد", 404);
    await data.destroy();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
module.exports = {
  getWorker,
  getAllWorker,
  createWorker,
  updateWorker,
  deleteWorker,
};
