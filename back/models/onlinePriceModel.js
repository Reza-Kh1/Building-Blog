const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const onlinePriceModel = dataBase.define("OnlinePrice", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT, },
    subject: { type: DataTypes.STRING },
    images: { type: DataTypes.ARRAY(DataTypes.STRING) },
    size: { type: DataTypes.STRING },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "OnlinePrice",
    timestamps: true,
    indexes: [{ unique: false, fields: ["status"] }]
})
module.exports = onlinePriceModel