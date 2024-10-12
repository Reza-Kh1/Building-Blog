const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { tagsModel, projectModel } = require("../models/sync");
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
  try {
    const data = await tagsModel.findAndCountAll();
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
  deleteTag,
};
