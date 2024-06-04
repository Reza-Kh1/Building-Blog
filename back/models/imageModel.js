const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");
const imageModel = dataBase.define(
  "Image",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Image",
    timestamps: false,
  }
);
module.exports = imageModel;
