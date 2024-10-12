const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const imageModel = dataBase.define("Media", {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("image", "video"),
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "Media",
    timestamps: true,
    indexes: [
        { unique: false, fields: ["status", "type"] }
    ]
})
module.exports = imageModel