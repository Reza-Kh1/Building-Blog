const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const projectModel = dataBase.define("project", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "نام قبلا در سیستم ثبت شده است",
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    gallery: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
    },
    video: {
        type: DataTypes.STRING,
    },
    alt: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: true,
    tableName: "project",
    indexes: [{ unique: false, fields: ["address", "description"] }, { unique: true, fields: ["name"] }]
})
module.exports = projectModel