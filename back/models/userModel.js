const { DataTypes } = require("sequelize")
const { dataBase } = require("../config/db")
const userModel = dataBase.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("ADMIN", "AUTHOR", "USER"),
        defaultValue: "USER"
    }
}, { timestamps: true, indexes: [{ unique: true, fields: ["email", "phone"] }], tableName: "User" })
module.exports = userModel