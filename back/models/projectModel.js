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
    workCategory: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: {
        type: DataTypes.STRING
    },
    gallery: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    video: {
        type: DataTypes.STRING,
    },
    alt: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: true,
    tableName: "project",
    indexes: [{ unique: false, fields: ["workCategory", "slug", "name", "address", "description"] }]
})
module.exports = projectModel