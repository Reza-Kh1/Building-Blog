const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const projectModel = dataBase.define("project", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gallery: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    video: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    }
}, {
    timestamps: true,
    tableName: "project"
})
module.exports = projectModel