const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const projectTags = dataBase.define(
    "ProjectTags",
    {
        ProjectId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Project",
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
        tableName: "ProjectTags",
        timestamps: false,
    }
);
module.exports = projectTags;
