const { userModel } = require("../models/sync")
const errorHandler = require("express-async-handler")
const { customError } = require("../middlewares/globalError")
const { Op, where } = require("sequelize")
const pagination = require("../utils/pagination")
const { createHash } = require("../utils/hashPassword")
const createToken = require("../utils/createToken")
const limit = process.env.LIMIT
const registerUser = errorHandler(async (req, res) => {
    let { name, phone, email, password, role } = req.body
    if (!name || !phone || !email || !password) return res.status(404).send({ message: "تمام فیلد های لازم را پر کنید" })
    try {
        const checkFirst = await userModel.findAll()
        if (!checkFirst.length) {
            role = "ADMIN"
        }
        password = createHash(password)
        const data = await userModel.create({ name, phone, email, password, role })
        res.send({ token: createToken(deletePass(data)), ...deletePass(data) })
    } catch (err) {
        throw customError(err.message || err, 403)
    }
})
const getAllUser = errorHandler(async (req, res) => {
    let { role, name, email, phone, page, order } = req.query
    page = page || 1
    let filter = {}
    let orderFilter = []
    if (order) {
        orderFilter.push(JSON.parse(order))
    }
    if (role) {
        filter.role = role
    }
    if (name) {
        filter.name = { [Op.iLike]: `%${name}%` }
    }
    if (email) {
        filter.email = { [Op.iLike]: `%${email}%` }
    }
    if (phone) {
        filter.phone = { [Op.iLike]: `%${phone}%` }
    }
    try {
        const data = await userModel.findAndCountAll({
            where: filter,
            limit: limit,
            offset: (page - 1) * limit,
            order: orderFilter || [["createdAt", "DESC"]]
        })
        const paginate = pagination(data.count, page)
        res.send({ ...data, pagination: paginate })
    } catch (err) {
        throw customError(err.message, 400)
    }
})
const deleteUser = errorHandler(async (req, res) => {
    const { id } = req.params
    try {
        const data = await userModel.destroy({ where: { id } })
        if (!data) throw customError("کاربر حذف نشد")
        res.send({ success: true })
    } catch (err) {
        throw customError(err.message || err, 401)
    }
})
const getProfileUser = errorHandler(async (req, res) => {
    const { id } = req.params
    try {
        const data = await userModel.findByPk(id, { attributes: { exclude: ["password", "createdAt", "updatedAt"] } })
        if (!data) throw customError("کاربر یافت نشد")
        res.send({ data })
    } catch (err) {
        throw customError(err, 403)
    }
})
const updateUser = errorHandler(async (req, res) => {
    const { email, password, name, phone, role } = req.body
    const { id } = req.params
    try {
        const update = await userModel.update({ email, password, name, phone, role }, { where: { id } })
        if (update) {
            res.send({ success: true })
        } else {
            throw customError("کاربر یافت نشد", 404)
        }
    } catch (err) {
        throw customError(err.message, 403)
    }
})
const deletePass = (data) => {
    return {
        name: data.name,
        email: data.email,
        phone: data.phone,
        id: data.id
    }
}
module.exports = {
    updateUser,
    registerUser,
    getAllUser,
    deleteUser,
    getProfileUser
}