const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");
const categoryModel = dataBase.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "این نام دسته از قبل وجود دارد",
      },
    },
  },
  {
    tableName: "Category",
    createdAt: true,
    updatedAt: false,
    indexes: [{ unique: true, fields: ["slug"] }],
  }
);
module.exports = categoryModel;
