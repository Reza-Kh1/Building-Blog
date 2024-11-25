const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const postTags = dataBase.define(
    "PostTags",
    {
        PostId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Post",
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
        tableName: "PostTags",
        timestamps: false,
        indexes: [{ unique: false, fields: ["TagId", "PostId"] }]
    }
);
module.exports = postTags;