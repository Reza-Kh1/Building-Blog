const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const reviewModel = dataBase.define(
  "Comment",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
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
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comment',
        key: 'id'
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    position: {
      type: DataTypes.ENUM(["ADMIN", "AUTHOR", "USER"]),
      defaultValue: "USER"
    }
  },
  {
    updatedAt: false, createdAt: true, tableName: "Comment",
    indexes: [{ unique: false, fields: ["name", "email", "phone", "text", "status"] }]
  }
);
module.exports = reviewModel;
