const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const onlinePriceModel = dataBase.define("onlinePrice", {
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
    tableName: "onlinePric",
    timestamps: true,
    indexes: [{ unique: false, fields: ["status"] }]
})
module.exports = onlinePriceModel