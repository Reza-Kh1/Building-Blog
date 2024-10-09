const { customError } = require("../middlewares/globalError");
const { projectModel, workerModel } = require("../models/sync");
const asyncHandler = require("express-async-handler");
const pagination = require("../utils/pagination");
const { Op } = require("sequelize");
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
    type,
    workerId, workCategory, slug, alt
  } = req.body;
  try {
    await projectModel.create({
      name,
      address,
      image,
      gallery,
      video,
      description,
      type,
      workerId,
      workCategory, slug, alt
    });
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await projectModel.findByPk(id);
    if (!data) return customError("آیتم مورد نظر یافت نشد");
    await data.destroy();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const updateProject = asyncHandler(async (req, res) => {
  const { name, address, image, gallery, video, description, workerId, slug, alt, workCategory } =
    req.body;
  const { id } = req.params;
  try {
    const data = await projectModel.findByPk(id);
    if (!data) return customError("آیتم مورد نظر یافت نشد");
    if (name) data.name = name;
    if (address) data.address = address;
    if (image) data.image = image;
    if (gallery) data.gallery = gallery;
    if (video) data.video = video;
    if (description) data.description = description;
    if (workerId) data.workerId = workerId;
    if (slug) data.slug = slug;
    if (alt) data.alt = alt;
    if (workCategory) data.workCategory = workCategory;
    await data.save();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await projectModel.findOne({
      where: { id },
      include: [
        {
          model: workerModel,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: projectModel,
              limit: limitShowProject,
              where: {
                id: { [Op.ne]: id },
              },
              order: [["createdAt", "DESC"]],
              attributes: { exclude: ["id", "name", "address", "image"] },
            },
          ],
        },
      ],
    });
    res.send({ data });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const getAllProject = asyncHandler(async (req, res) => {
  let { search, page, order, workCategory } = req.query;
  page = page || 1;
  let filter = {};
  let orderFilter = [];
  // if (order) {
  //   const length1 = order.split("-")[0];
  //   const length2 = order.split("-")[1];
  //   orderFilter.push(length1);
  //   orderFilter.push(length2);
  // } else {
  //   orderFilter.push(["createdAt", "DESC"]);
  // }
  if (order) {
    const [column, direction] = order.split("-"); // استخراج نام ستون و جهت مرتب‌سازی
    orderFilter.push([column, direction]);
  } else {
    orderFilter.push(["createdAt", "DESC"]); // ترتیب پیش‌فرض
  }
  if (workCategory || search) {
    filter[Op.or] = [];
    if (workCategory) {
      filter[Op.or].push({ workCategory: { [Op.contains]: [workCategory] } });
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
