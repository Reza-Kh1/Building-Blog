const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const uploadImage = asyncHandler(async (req, res) => {
  if (req.file == undefined) throw customError("هیچ عکسی انتخاب نشده", 401);
  try {
    return res.send({ url: req.file.location });
  } catch (error) {
    throw customError(error.message, 400);
  }
});
const deleteImage = asyncHandler(async (req, res) => {
  const { url } = req.query;
  const key = url.split("/").slice(-1)[0];
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: key,
  };
  try {
    await client.send(new DeleteObjectCommand(params));
    res.send({ success: true });
  } catch (error) {
    throw customError(error.message, 400);
  }
});
const getAllImage = asyncHandler(async (req, res) => {
  let { page } = req.query;
  if (!page) {
    page = 1;
  }
  const limit = process.env.LIMIT;
  try {
    const data = await imageModel.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: page * limit - limit,
    });
    if (!data.count) return res.send({ message: "هیچ عکسی دخیره نشده" });
    const paginate = pagination(data.count, page, limit);
    res.send({ ...data, paginate });
  } catch (err) {
    throw customError(err, 400);
  }
});
module.exports = {
  deleteImage,
  uploadImage,
  getAllImage,
};
