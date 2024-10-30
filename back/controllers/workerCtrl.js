const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const workerModel = require("../models/workerModel");
const pagination = require("../utils/pagination");
const { Op } = require("sequelize");
const tagsModel = require("../models/tagsModel");
const projectModel = require("../models/projectModel");
const limit = process.env.LIMIT;
const getWorker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { page } = req.query
  page = page || 1
  try {
    const data = await workerModel.findOne({
      where: { name: id },
      include: [
        {
          model: tagsModel,
          through: {
            attributes: []
          }
        },
        {
          model: projectModel,
          attributes: ["image", "id", "address", "name", "createdAt", "alt"],
          limit: limit,
          include: {
            model: workerModel,
            attributes: ["name"],
          }
        }
      ]
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, 400);
  }
});
const getAllWorker = asyncHandler(async (req, res) => {
  let { search, page, order, tags } = req.query;
  let includeTags;
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
  if (tags) {
    includeTags = {
      model: tagsModel,
      attributes: ["name"],
      through: {
        attributes: [],
      },
      where: {
        name: {
          [Op.in]: tags.split("-")
        }
      },
      required: tags.split("-").length ? true : false
    }
  } else {
    includeTags = {
      model: tagsModel,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    }
  }
  try {
    const data = await workerModel.findAndCountAll({
      where: filter,
      offset: (page - 1) * limit,
      limit: limit,
      order: [orderFilter],
      attributes: {
        exclude: ["socialMedia", "address", "description", "updatedAt"],
      },
      include: [includeTags]
    });
    const paginate = pagination(data.count, page, limit);
    res.send({ ...data, paginate });
  } catch (err) {
    console.log(err);
    throw customError(err, err.statusCode || 400);
  }
});
const createWorker = asyncHandler(async (req, res) => {
  const { name, phone, socialMedia, address, description, image, tags } =
    req.body;
  try {
    const data = await workerModel.create({
      name,
      phone,
      socialMedia,
      address,
      description,
      image,
    });
    const newTags = tags?.map(i => i.id)
    await data.addTags(newTags);
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, err.statusCode || 400);
  }
});
const updateWorker = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone, socialMedia, address, description, image, tags } =
    req.body;
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
    data.address = address;
    data.description = description;
    data.image = image;
    await data.save();
    if (tags.length) {
      const newTags = tags?.map(i => i?.id)
      await data.setTags(newTags)
    } else {
      await data.setTags([])
    }
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
    await data.setTags([]);
    await data.destroy();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const getAllWorkerName = asyncHandler(async (req, res) => {
  try {
    const data = await workerModel.findAll({ attributes: ["name", "id"] });
    res.send({ data });
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
  getAllWorkerName,
};
