const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const projectModel = dataBase.define("Project", {
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
    size: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: "Project",
    indexes: [{ unique: false, fields: ["address", "description"] }, { unique: true, fields: ["name"] }]
})
module.exports = projectModel