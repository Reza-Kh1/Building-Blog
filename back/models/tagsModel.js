const { DataTypes } = require("sequelize");
const { dataBase } = require("../config/db");

const tagsModel = dataBase.define(
  "Tag",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "این نام قبلا ثبت شده است",
      },
    },
  },
  {
    timestamps: false,
    tableName: "Tag",
  }
);
module.exports = tagsModel;

// .addTag(1) #
// .addTags([1,3]) #
// .getTags() #[]
// .removeTag(1)
// .removeTags([1,3])
// .setTags([1,3]) #new tags
// .countTags() #number
// .hasTag() #boolean
// .hasTags() #boolean
