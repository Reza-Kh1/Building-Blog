const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");
const pageInfoModel = dataBase.define(
    "pageInfo",
    {
        page: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: { type: DataTypes.JSONB }
    },
    { tableName: "pageInfo", timestamps: false }
)
module.exports = pageInfoModel