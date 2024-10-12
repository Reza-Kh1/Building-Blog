const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const messageModel = dataBase.define("Message", {
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
    tableName: "Message",
    indexes: [{ unique: false, fields: ["status"] }]
})
module.exports = messageModel