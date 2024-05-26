const { dataBase } = require("../config/db")
const userModel = require("./userModel")
const categoryModel = require("./categoryModel")
// dataBase.sync({ force: true })
dataBase.sync()
module.exports = {
    userModel,
    categoryModel
}