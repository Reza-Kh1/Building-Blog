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
    if (tags) {
      const newTag = tags.map((i) => i.id)
      await data.addTags(newTag);
    }
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
    if (workerId) data.workerId = workerId;
    if (address) data.address = address;
    data.image = image;
    data.gallery = gallery;
    data.video = video;
    data.description = description;
    data.status = status;
    data.alt = alt;
    await data.save();
    if (tags.length) {
      const newTag = tags?.map((i) => i?.id)
      await data.setTags(newTag);
    } else {
      await data.setTags([]);
    }
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
        {
          model: tagsModel, through: {
            attributes: []
          }
        },
      ],
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const getAllProject = asyncHandler(async (req, res) => {
  let { search, page, order, status, tags, expert } = req.query;
  page = page || 1;
  let filter = {};
  let tagsArray = []
  let orderFilter = [];
  if (order) {
    const [column, direction] = order.split("-");
    orderFilter.push([column, direction]);
  } else {
    orderFilter.push(["createdAt", "DESC"]);
  }
  if (expert) {
    filter.workerId = expert
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
  if (tags) tagsArray = tags.split("-");
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
        }, {
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
