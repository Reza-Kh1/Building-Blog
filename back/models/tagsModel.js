const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const tagsModel = dataBase.define("tags", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "این نام قبلا ثبت شده است"
        }
    },
}, {
    timestamps: false,
    tableName: "tags",
})
module.exports = tagsModel