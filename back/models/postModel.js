const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const postModel = dataBase.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "این اسلاگ قبلا ثبت شده !",
      },
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalComments: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Post",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["title"] },
      { unique: false, fields: ["status", "description"] },
    ],
  }
);
module.exports = postModel;
