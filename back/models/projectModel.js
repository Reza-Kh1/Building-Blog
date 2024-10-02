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
    thumbnail: {
        type: DataTypes.STRING
    },
    gallery: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    video: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: true,
    tableName: "project"
})
module.exports = projectModel