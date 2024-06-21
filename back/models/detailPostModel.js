const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const detailPostModel = dataBase.define(
  "DetailPost",
  {
    text: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keyword: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    }
  },
  { tableName: "DetailPost", timestamps: false }
);
module.exports = detailPostModel;
