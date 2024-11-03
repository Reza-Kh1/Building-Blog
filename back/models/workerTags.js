const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const workerTags = dataBase.define(
    "WorkerTags",
    {
        WorkerId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Worker",
                key: "id"
            }
        },
        TagId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Tag",
                key: "id"
            }
        }
    },
    {
        tableName: "WorkerTags",
        timestamps: false,
    }
);
module.exports = workerTags;
