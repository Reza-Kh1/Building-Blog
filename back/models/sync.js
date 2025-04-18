const { dataBase } = require("../config/db");
const userModel = require("./userModel");
const categoryModel = require("./categoryModel");
const postModel = require("./postModel");
const commentModel = require("./commentModel");
const detailPostModel = require("./detailPostModel");
const pageInfoModel = require("./pageInfoModel");
const projectModel = require("./projectModel");
const workerModel = require("./workerModel");
const onlinePriceModel = require("./onlinePriceModel");
const messageModel = require("./messageModel");
const mediaModel = require("./mediaModel");
const tagsModel = require("./tagsModel");
const postTags = require("./postTags");
const workerTags = require("./workerTags");
const projectTags = require("./projectTags");
////////  The Relationship of Categorys
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
  onUpdate: "CASCADE",
});
postModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
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
//////// The Relationship of Projects
workerModel.hasMany(projectModel, {
  foreignKey: "workerId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
projectModel.belongsTo(workerModel, {
  foreignKey: "workerId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
//////// The Relationship of Tags
tagsModel.belongsToMany(workerModel, {
  timestamps: false,
  through: workerTags,
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
workerModel.belongsToMany(tagsModel, {
  timestamps: false,
  through: workerTags,
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
tagsModel.belongsToMany(projectModel, {
  timestamps: false,
  through: projectTags,
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
projectModel.belongsToMany(tagsModel, {
  timestamps: false,
  through: projectTags,
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
tagsModel.belongsToMany(postModel, {
  timestamps: false,
  through: postTags,
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
postModel.belongsToMany(tagsModel, {
  timestamps: false,
  through: postTags,
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
dataBase.sync({ alter: true });
// dataBase.sync({ force: true });
// dataBase.sync();
module.exports = {
  userModel,
  commentModel,
  categoryModel,
  postModel,
  detailPostModel,
  pageInfoModel,
  projectModel,
  workerModel,
  onlinePriceModel,
  messageModel,
  mediaModel,
  tagsModel, postTags, projectTags, workerTags
};
