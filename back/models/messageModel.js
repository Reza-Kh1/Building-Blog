const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const messageModel = dataBase.define("message", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    subject: { type: DataTypes.STRING, },
    text: { type: DataTypes.TEXT, },
}, {
    timestamps: true,
    tableName: "message",
    indexes: [{ unique: false, fields: ["status"] }]
})
module.exports = messageModel