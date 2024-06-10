const { dataBase } = require("../config/db");
const userModel = require("./userModel");
const categoryModel = require("./categoryModel");
const postModel = require("./postModel");
const commentModel = require("./commentModel");
const detailPostModel = require("./detailPostModel");
const imageModel = require("./imageModel");
////////  The Relationship of Categorys
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
  foreignKey: "parentCategoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
categoryModel.belongsTo(categoryModel, {
  as: "parentCategory",
  foreignKey: "parentCategoryId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
//////// The Relationship of Posts
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
postModel.hasOne(detailPostModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
detailPostModel.belongsTo(postModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
//////// The Relationship of Comments
postModel.hasMany(commentModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.belongsTo(postModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.hasMany(commentModel, {
  as: "replies",
  foreignKey: "parentId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.belongsTo(postModel, {
  as: "parent",
  foreignKey: "parentId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


// dataBase.sync({ force: true });
dataBase.sync();
module.exports = {
  userModel,
  commentModel,
  categoryModel,
  postModel,
  detailPostModel,
  imageModel,
};