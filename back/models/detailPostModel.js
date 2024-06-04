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
    keyward: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "DetailPost", timestamps: true }
);
module.exports = detailPostModel;
