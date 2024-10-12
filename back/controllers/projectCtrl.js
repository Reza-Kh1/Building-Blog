const { customError } = require("../middlewares/globalError");
const { projectModel, workerModel } = require("../models/sync");
const asyncHandler = require("express-async-handler");
const pagination = require("../utils/pagination");
const { Op } = require("sequelize");
const { tagsModel } = require("../models/sync");
const limit = process.env.LIMIT;
const limitShowProject = 6;

const createProject = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    image,
    gallery,
    video,
    description,
    workerId,
    alt,
    tags, status
  } = req.body;
  try {
    const data = await projectModel.create({
      name,
      address,
      image,
      gallery,
      video,
      description,
      workerId,
      alt, status: status | false
    });
    await data.addTags(tags);
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await projectModel.findByPk(id);
    if (!data) throw customError("آیتم مورد نظر یافت نشد");
    await data.setTags([]);
    await data.destroy();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const updateProject = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    image,
    gallery,
    video,
    description,
    workerId,
    status,
    alt,
    tags,
  } = req.body;
  const { id } = req.params;
  try {
    const data = await projectModel.findByPk(id);
    if (!data) throw customError("آیتم مورد نظر یافت نشد");
    if (name) data.name = name;
    if (address) data.address = address;
    if (image) data.image = image;
    if (gallery) data.gallery = gallery;
    if (video) data.video = video;
    if (description) data.description = description;
    if (workerId) data.workerId = workerId;
    if (status) data.status = status;
    if (alt) data.alt = alt;
    await data.save();
    if (tags) await data.setTags(tags);
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const getProject = asyncHandler(async (req, res) => {
  const { name } = req.params;
  try {
    const data = await projectModel.findOne({
      where: { name: name },
      include: [
        {
          model: workerModel,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "id",
              "address",
              "description",
              "socialMedia",
            ],
          },
          include: [
            {
              model: projectModel,
              limit: limitShowProject,
              where: {
                name: { [Op.ne]: name },
              },
              order: [["createdAt", "DESC"]],
              attributes: { exclude: ["id", "name", "address", "image"] },
            },
          ],
        },
        { model: tagsModel, attributes: ["name"], through: "projectTags" },
      ],
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const getAllProject = asyncHandler(async (req, res) => {
  let { search, page, order, status } = req.query;
  page = page || 1;
  let filter = {};
  let orderFilter = [];
  if (order) {
    const [column, direction] = order.split("-");
    orderFilter.push([column, direction]);
  } else {
    orderFilter.push(["createdAt", "DESC"]);
  }
  if (search || status) {
    filter[Op.or] = [];
    if (status) {
      filter[Op.or].push(
        { status: status },
      );
    }
    if (search) {
      filter[Op.or].push(
        { name: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      );
    }

  }

  try {
    const data = await projectModel.findAndCountAll({
      where: filter,
      offset: (page - 1) * limit,
      limit: limit,
      order: [orderFilter],
      attributes: { exclude: ["gallery", "video", "description"] },
      include: [
        {
          model: workerModel,
          attributes: ["name"],
        },
      ],
    });
    const paginate = pagination(data.count, page, limit);
    res.send({ ...data, paginate });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
module.exports = {
  createProject,
  deleteProject,
  updateProject,
  getProject,
  getAllProject,
};
