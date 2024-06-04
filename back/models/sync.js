const { dataBase } = require("../config/db");
const userModel = require("./userModel");
const categoryModel = require("./categoryModel");
const postModel = require("./postModel");
const reviewModel = require("./reviewModel");
const detailPost = require("./detailPostModel");
const imageModel = require("./imageModel");
////////  Relation Categorys
userModel.hasMany(categoryModel, {
  foreignKey: "userId",
  onUpdate: "SET NULL",
  onDelete: "SET NULL",
});
categoryModel.belongsTo(userModel, {
  foreignKey: "userId",
  onUpdate: "SET NULL",
  onDelete: "SET NULL",
});
categoryModel.hasMany(categoryModel, {
  as: "subCategory",
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
categoryModel.belongsTo(categoryModel, {
  as: "parentCategory",
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
//////// Relation Posts
userModel.hasMany(postModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
postModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});
categoryModel.hasMany(postModel, {
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
postModel.belongsTo(categoryModel, {
  foreignKey: "categoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
postModel.hasOne(detailPost, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
detailPost.belongsTo(postModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
//////// Relation Reviews
postModel.hasMany(reviewModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
reviewModel.belongsTo(postModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// dataBase.sync({ force: true });
dataBase.sync();
module.exports = {
  userModel,
  reviewModel,
  categoryModel,
  postModel,
  detailPost,
  imageModel,
};
