const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const postModel = dataBase.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "این اسلاگ قبلا ثبت شده !",
      },
      allowNull: false,
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
    keycode: {
      type: DataTypes.STRING,
      defaultValue: () => {
        const key = [...Array(8)]
          .map(() => (~~(Math.random() * 36)).toString(36))
          .join("");
        return key.toUpperCase();
      },
    },
  },
  {
    tableName: "Post",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["slug", "keycode"] },
      { unique: false, fields: ["status", "description", "title"] },
    ],
  }
);
module.exports = postModel;
