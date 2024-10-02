const asyncHandler = require("express-async-handler")
const { customError } = require("../middlewares/globalError")
const { messageModel } = require("../models/sync")
const pagination = require("../utils/pagination")
const limit = process.env.LIMIT_COMMENT;
const createMessage = asyncHandler(async (req, res) => {
    const { name, phone, subject, text } = req.body
    try {
        await messageModel.create({ name, phone, subject, text })
        res.send({ success: true })
    } catch (err) {
        throw customError(err, 400)
    }
})
const getMessage = asyncHandler(async (req, res) => {
    let { page } = req.query
    if (page) {
        page = 1
    }
    try {
        const data = await messageModel.findAndCountAll({
            where: { status: true },
            limit: limit,
            offset: (page - 1) * limit,
            order: [["createdAt", "DESC"]],
        })
        const pager = pagination(data.count, page, limit)
        res.send({ ...data, pager })
    } catch (err) {
        throw customError(err, 400)
    }
})
const deleteMessage = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const data = await messageModel.findByPk({ id })
        if (!data) throw customError("آیتم یافت نشد", 404)
        await data.destroy()
        res.send({ success: true })
    } catch (err) {
        throw customError(err)
    }
})
const updateMessage = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await messageModel.update({ status: true }, { where: { id } })
        res.send({ success: true })
    } catch (err) {
        throw customError(err, 400)
    }
})
module.exports = {
    getMessage,
    deleteMessage,
    updateMessage,
    createMessage
}