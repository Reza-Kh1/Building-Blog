const { DataTypes, Model } = require("sequelize");
const { dataBase } = require("../config/db");

const reviewModel = dataBase.define(
  "Review",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?:[0-9] ?){9,10}[0-9]$/,
          msg: "لطفا شماره تلفن خود را صحیح وارد کنید",
        },
      },
    },
  },
  { updatedAt: false, createdAt: true, tableName: "Review" }
);
module.exports = reviewModel;
