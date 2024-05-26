const { DataTypes } = require("sequelize")
const { dataBase } = require("../config/db")
const categoryModel = dataBase.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    }
}, { tableName: "Category", timestamps: true, indexes: [{ unique: true, fields: ["slug"] }] })
module.exports = categoryModel