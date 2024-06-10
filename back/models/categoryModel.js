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
    parentCategoryId: {
      type: DataTypes.INTEGER,
      references:{
        model:"Category",
        key:"id"
      }
    }
  },
  {
    tableName: "Category",
    createdAt: true,
    updatedAt: false,
    indexes: [{ unique: true, fields: ["slug"] }],
  }
);
module.exports = categoryModel;
