const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { pageInfoModel } = require("../models/sync");
const getPageIfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pageInfoModel.findOne({ where: { page: id } });
    if (!data) throw customError("همچین ایتمی موجود نیست", 404)
    res.send({data })
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const updatePageInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page, text } = req.body;
  try {
    const [data, created] = await pageInfoModel.findOrCreate({ where: { page: id }, defaults: { page: page, text: text } });
    if (!created) {
      if (page) data.page = page;
      if (text) data.text = text;
      await data.save();
    }
    res.send({ success: true })
  } catch (err) {
    throw customError(err);
  }
});
module.exports = {
  getPageIfo,
  updatePageInfo,
};
