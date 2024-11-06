const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { tagsModel, postModel, projectModel, workerModel, categoryModel } = require("../models/sync");
const { dataBase } = require("../config/db");
const limit = process.env.LIMIT;
const createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  try {
    await tagsModel.create({ name });
    res.send({ success: true });
  } catch (err) {
    throw customError(err);
  }
});
const getAllTags = asyncHandler(async (req, res) => {
  const { tags } = req.query
  try {
    if (tags) {
      const projects = await projectModel.findAll({
        where: {
          status: true
        },
        include: [
          {
            model: tagsModel,
            where: {
              id: tags
            },
            attributes: [],
            through: {
              attributes: [],
            },
          },
          {
            model: workerModel,
            attributes: ["name"],
          }
        ],
        attributes: ["name", "address", "image", "alt", "updatedAt"],
        limit: limit,
        order: dataBase.random()
      })
      const posts = await postModel.findAll({
        where: {
          status: true
        },
        include: [
          {
            model: tagsModel,
            where: {
              id: tags
            },
            attributes: [],
            through: {
              attributes: [],
            },
          },
          { model: categoryModel, attributes: ["slug", "name"] }
        ],
        attributes: { exclude: ["userId", "categoryId", "status", "createdAt", "id"] },
        limit: limit,
        order: dataBase.random()
      })
      const workers = await workerModel.findAll({
        include: [
          {
            model: tagsModel,
            where: {
              id: tags
            },
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: ["name", "phone", "image", "createdAt",],
        limit: limit,
        order: dataBase.random()
      })
      res.send({ projects, posts, workers })
      return
    }
    const data = await tagsModel.findAll({
      where: {
        id: 1
      }, include: [{ model: projectModel }], limit: 1
    });
    res.send({ data });
  } catch (err) {
    throw customError(err);
  }
});
const updateTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const data = await tagsModel.findByPk(id);
    if (!data) throw customError("تگ یافت نشد !", 404);
    if (name) data.name = name;
    await data.save();
    res.send({ data });
  } catch (err) {
    throw customError(err.message, err.status);
  }
});
const deleteTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await tagsModel.findByPk(id);
    if (!data) throw customError("تگ یافت نشد !", 404);
    await data.destroy();
    res.send({ data });
  } catch (err) {
    throw customError(err);
  }
});
module.exports = {
  createTag,
  getAllTags,
  updateTag,
  deleteTag
};