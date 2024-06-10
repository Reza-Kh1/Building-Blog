const errorHandler = require("express-async-handler");
const { categoryModel, postModel } = require("../models/sync");
const { customError } = require("../middlewares/globalError");
const createCategory = errorHandler(async (req, res) => {
  const { name, slug, categoryId } = req.body;
  if (!name || !slug) throw customError("فیلد های لازیم را پر کنید");
  try {
    const userId = res.userInfo.id;
    await categoryModel.create({
      name,
      slug,
      userId,
      parentCategoryId: categoryId,
    });
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const updateCategory = errorHandler(async (req, res) => {
  const { name, slug, categoryId } = req.body;
  const { id } = req.params;
  try {
    const data = await categoryModel.findByPk(id);
    if (!data) throw customError("دسته وجود ندارد");
    if (name) {
      data.name = name;
    }
    if (slug) {
      data.slug = slug;
    }
    if (categoryId) {
      data.parentCategoryId = categoryId;
    }
    await data.save();
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const deleteCategory = errorHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await categoryModel.destroy({ where: { id } });
    if (!data) throw customError("دسته حذف نشد");
    res.send({ success: true });
  } catch (err) {
    throw customError("اول زیر دسته های موجود را حذف کنید", 401);
  }
});
const getAllCategory = errorHandler(async (req, res) => {
  try {
    const data = await categoryModel.findAll({
      where: { parentCategoryId: null },
      order: [["createdAt", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
    });
    for (let i = 0; i < data.length; i++) {
      data[i].dataValues.subCategory = await getReplies(data[i].id);
    }
    res.send([...data]);
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getCategoryPosts = errorHandler(async (req, res) => {
  const { id } = req.params
  try {
    const data = await categoryModel.findOne({
      where: { slug: id }, include: [{
        model: postModel,
        separate: true,
        attributes: { exclude: ["status", "createdAt", "userId", "categoryId"] },
        where: { status: true }
      }], attributes: {
        exclude: ["parentCategoryId", "createdAt", "userId"]
      }
    })
    res.send( data )
  } catch (err) {
    throw customError(err.message, 401);
  }
});
const getReplies = async (categoryId) => {
  const replies = await categoryModel.findAll({
    where: { parentCategoryId: categoryId },
    order: [["createdAt", "ASC"]],
    attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
  });
  for (let i = 0; i < replies.length; i++) {
    replies[i].dataValues.subCategory = await getReplies(replies[i].id);
  }
  return replies;
};
module.exports = {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryPosts,
  updateCategory,
};