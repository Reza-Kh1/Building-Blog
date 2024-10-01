const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");
const pageInfoModel = dataBase.define(
  "pageInfo",
  {
    page: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "این نام قبلا ثبت شده است",
      },
    },
    text: { type: DataTypes.JSONB },
  },
  {
    tableName: "pageInfo",
    timestamps: false,
    indexes: [{ unique: true, fields: ["page"] }],
  }
);
module.exports = pageInfoModel;
