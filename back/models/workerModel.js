const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const workerModel = dataBase.define("worker", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    socialMedia: { type: DataTypes.JSONB },
    address: {
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    }
}, {
    tableName: "worker",
    timestamps: true
})
module.exports = workerModel