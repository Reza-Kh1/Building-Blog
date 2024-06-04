const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const imageModel = require("../models/imageModel");

const createImage = asyncHandler(async (req, res) => {
  if (req.file == undefined) throw customError("هیچ عکسی انتخاب نشده", 401);
  try {
    const url = req.file.path.replace(/\\/g, "/");
    await imageModel.create({ url });
    const body = {
      success: 1,
      file: {
        url: process.env.URL_SITE + url,
      },
    };
    res.send({ ...body });
  } catch (err) {
    throw customError(err, 400);
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
    const pager = pagination(data.count, limit, page);
    res.send({ ...data, pagination: pager });
  } catch (err) {
    throw customError(err, 400);
  }
});
const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const img = await imageModel.findByPk(id);
  if (!img) throw customError("عکس مورد نظر یافت نشد !", 404);
  const nameImg = img.url.replace(process.env.URL_SAVE_IMAGE, "");
  const directory = path.join(
    __dirname,
    `${process.env.URL_IMAGE_WWW}/${nameImg}`
  );
  try {
    if (fs.existsSync(directory)) {
      fs.unlinkSync(directory);
      await img.destroy();
      res.send({ message: "عکس با موفقیت حذف شد" });
    } else {
      throw customError("فایل مورد نظر وجود ندارد");
    }
  } catch (err) {
    throw customError(err, 404);
  }
});
module.exports = {
  deleteImage,
  createImage,
  getAllImage,
};
