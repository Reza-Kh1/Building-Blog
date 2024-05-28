const { DataTypes } = require("sequelize")
const { dataBase } = require("../config/db")
const userModel = dataBase.define("User", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            isUUID: 4
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "ایمیل قبلا در سیستم ثبت شده است"
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "شماره تلفن قبلا در سیستم ثبت شده است"
        },
        validate: {
            is: {
                args: /^(?:[0-9] ?){9,10}[0-9]$/,
                msg: "لطفا شماره تلفن خود را صحیح وارد کنید",
            },
        },
    },
    role: {
        type: DataTypes.ENUM("ADMIN", "AUTHOR", "USER"),
        defaultValue: "USER"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    indexes: [
        { unique: false, fields: ["name", "role"] },
        { unique: true, fields: ["email", "phone"] }
    ],
    tableName: "User"
})
module.exports = userModel