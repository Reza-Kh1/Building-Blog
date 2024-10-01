const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { pageInfoModel } = require("../models/sync");
const getPageIfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pageInfoModel.findOne({ where: { page: id } });
    return { ...data };
  } catch (err) {
    throw customError(err, 400);
  }
});
const createPageInfo = asyncHandler(async (req, res) => {
  const { page, text } = req.body;
  try {
    await pageInfoModel.create({ page, text });
    return { success: true };
  } catch (err) {
    throw customError(err, 400);
  }
});
const updatePageInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page, text } = req.body;
  try {
    const data = await pageInfoModel.findByPk({ page: id });
    if (page) {
      data.page = page;
    }
    if (text) {
      data.text = text;
    }
    await data.save();
    return { success: true };
  } catch (err) {
    throw customError(err, 400);
  }
});
module.exports = {
  getPageIfo,
  createPageInfo,
  updatePageInfo,
};
