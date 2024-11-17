const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { pageInfoModel, workerModel, postModel, projectModel, tagsModel, categoryModel } = require("../models/sync");
const getHomePage = asyncHandler(async (req, res) => {
  try {
    const setting = { order: [["createdAt", "DESC"]] }
    const page = await pageInfoModel.findOne({ where: { page: "home" } });
    const workers = await workerModel.findAll({
      ...setting,
      attributes: ["id", "name", "phone", "image", "createdAt"],
      include: [{ model: tagsModel, attributes: ["name"], through: { attributes: [] } }]
    })
    const posts = await postModel.findAll({
      ...setting,
      attributes: { exclude: ["userId", "categoryId"] },
      include: { model: categoryModel, attributes: ["name"] }
    });
    const projects = await projectModel.findAll({
      ...setting,
      attributes: {
        exclude: ["gallery", "video", "size", "price", "description", "status"]
      }, include: [{ model: workerModel, attributes: ["name"] }]
    });
    const data = {
      page,
      workers,
      posts,
      projects
    }
    res.send({ data });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const getPageIfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pageInfoModel.findOne({ where: { page: id } });
    if (!data) return res.send({ data: null });
    res.send({ data });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const updatePageInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page, text } = req.body;
  try {
    const [data, created] = await pageInfoModel.findOrCreate({
      where: { page: id },
      defaults: { page: page, text: text },
    });
    if (!created) {
      if (text) data.text = text;
      await data.save();
    }
    res.send({ success: true });
  } catch (err) {
    throw customError(err);
  }
});
module.exports = {
  getPageIfo,
  updatePageInfo, getHomePage
};