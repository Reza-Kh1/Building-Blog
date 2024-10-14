const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const workerModel = dataBase.define(
  "Worker",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "نام قبلا در سیستم ثبت شده است",
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "شماره قبلا در سیستم ثبت شده است",
      },
    },
    socialMedia: { type: DataTypes.JSONB },
    address: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Worker",
    timestamps: true,
    indexes: [{ unique: true, fields: ["name", "phone"] }],
  }
);
module.exports = workerModel;
