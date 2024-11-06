const { customError } = require("../middlewares/globalError");
const { projectModel, workerModel, tagsModel, projectTags } = require("../models/sync");
const asyncHandler = require("express-async-handler");
const pagination = require("../utils/pagination");
const { Op } = require("sequelize");
const { dataBase } = require("../config/db");
const limit = process.env.LIMIT;
const createProject = asyncHandler(async (req, res) => {
  const { name, address, image, gallery, video, description, workerId, alt, tags, status, size, price } = req.body;
  try {
    const data = await projectModel.create({
      name,
      address,
      image,
      gallery,
      video,
      description,
      workerId, size, price,
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
  const { name, address, image, gallery, video, description, workerId, status, alt, tags, size, price } = req.body;
  const { id } = req.params;
  try {
    const data = await projectModel.findByPk(id);
    if (!data) throw customError("آیتم مورد نظر یافت نشد");
    if (name) data.name = name;
    if (workerId) data.workerId = workerId;
    if (address) data.address = address;
    data.size = size;
    data.price = price;
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
  let projects
  try {
    const data = await projectModel.findOne({
      where: { name: name },
      include: [
        {
          model: workerModel,
          attributes: {
            exclude: [
              "updatedAt",
              "address",
              "description",
              "socialMedia",
            ],
          },
        },
        {
          model: tagsModel,
          through: {
            attributes: []
          }
        },
      ],
    });
    const tagId = data?.Tags?.map((i) => i.id)
    if (!res.isLogin) {
      projects = await projectModel.findAll({
        where: {
          status: true,
          id: { [Op.ne]: data.id },
        },
        attributes: { exclude: ["gallery", "video", "description", "size", "price", "createdAt", "status"] },
        include: [
          {
            model: tagsModel,
            where: { id: { [Op.in]: tagId } },
            through: {
              attributes: [],
            },
          },
          {
            model: workerModel,
            attributes: ["name"]
          }
        ],
        limit: limit,
        order: dataBase.random(),
      });
    }
    res.send({ projects, data });
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
  if (!res.isLogin) {
    filter[Op.and] = [];
    filter[Op.and].push(
      { status: true }
    );
    if (search) {
      filter[Op.and].push({
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { address: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ]
      });
    }
  } else {
    if (search || status) {
      filter[Op.and] = [];
      if (search) {
        filter[Op.and].push({
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { address: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } }
          ]
        });
      }
      if (status) {
        filter[Op.and].push(
          { status: status }
        );
      }
    }
  }
  if (tags) tagsArray = tags.split("-");
  try {
    const data = await projectModel.findAndCountAll({
      where: filter,
      offset: (page - 1) * limit,
      limit: limit,
      order: [orderFilter],
      attributes: { exclude: ["gallery", "video", "description", " size", "price"] },
      distinct: true,
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
