const { userModel } = require("../models/sync")
const errorHandler = require("express-async-handler")
const { customError } = require("../middlewares/globalError")
const limit = process.env.LIMIT
const registerUser = errorHandler(async (req, res) => {
    let { name, phone, email, password, role } = req.body
    if (!name || !phone || !email || !password) return res.send({ message: "تمام فیلد های لازم را پر کنید" })
    try {
        const checkFirst = await userModel.findAll()
        if (!checkFirst.length) {
            role = "ADMIN"
        }
        const data = await userModel.create({ name, phone, email, password, role })
        res.send({ data })
    } catch (err) {
        throw customError(err.message || err, 403)
    }
})
const getAllUser = errorHandler(async (req, res) => {
    let { role, name, email, phone, page } = req.query
    if (!page) {
        page = 1
    }
    let filter = {}

    try {
        const data = await userModel.findAndCountAll({
            where: filter,
            limit: limit,
            offset: page * limit - limit,
            order: [["createdAt", "DESC"]]
        })
        res.send({ ...data })
    } catch (err) {
        throw customError(err.message, 400)
    }
})
const deleteUser = errorHandler(async (req, res) => {
    res.send({ ok: "ok" })
    try {

    } catch (err) {
        throw customError(err, 403)
    }
})
const getProfileUser = errorHandler(async (req, res) => {
    res.send({ ok: "ok" })
    try {

    } catch (err) {
        throw customError(err, 403)
    }
})
const updateUser = errorHandler(async (req, res) => {
    res.send({ ok: "ok" })
    try {

    } catch (err) {
        throw customError(err, 403)
    }
})
module.exports = {
    updateUser,
    registerUser,
    getAllUser,
    deleteUser,
    getProfileUser
}