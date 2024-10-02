const { customError } = require("../middlewares/globalError")
const { projectModel, workerModel } = require("../models/sync")
const asyncHandler = require("express-async-handler")
const pagination = require("../utils/pagination")
const limit = process.env.LIMIT;

const createProject = asyncHandler(async (req, res) => {
    const { name, address, thumbnail, gallery, video, description } = req.body
    try {
        await projectModel.create({ name, address, thumbnail, gallery, video, description })
        res.send({ success: true })
    } catch (err) {
        throw customError(err)
    }
})
const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const data = await projectModel.findByPk({ id })
        if (!data) return customError("آیتم مورد نظر یافت نشد")
        await data.destroy()
        res.send({ success: true })
    } catch (err) {
        throw customError(err)
    }
})
const updateProject = asyncHandler(async (req, res) => {
    const { name, address, thumbnail, gallery, video, description } = req.body
    const { id } = req.params
    try {
        const data = await projectModel.findByPk({ id })
        if (!data) return customError("آیتم مورد نظر یافت نشد")
        if (name) {
            data.name = name
        }
        if (address) {
            data.address = address
        }
        if (thumbnail) {
            data.thumbnail = thumbnail
        }
        if (gallery) {
            data.gallery = gallery
        }
        if (video) {
            data.video = video
        }
        if (description) {
            data.description = description
        }
        await data.save()
        res.send({ success: true })
    } catch (err) {
        throw customError(err)
    }
})
const getProject = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const data = await projectModel.findOne({
            where: { id },
            include: [{
                model: workerModel,
                include: [{ model: projectModel, limit: limit, order: ["createdAt", "DESC"] }]
            }]
        })
        res.send({ ...data })
    } catch (err) {
        throw customError(err)
    }
})
const getAllProject = asyncHandler(async (req, res) => {
    let { search, page, order } = req.params;
    page = page || 1;
    let filter = {};
    let orderFilter = [];
    if (order) {
        const length1 = order.split("-")[0];
        const length2 = order.split("-")[1];
        orderFilter.push(length1);
        orderFilter.push(length2);
    } else {
        orderFilter.push(["createdAt", "DESC"]);
    }
    if (search) {
        filter[Op.or] = [
            { name: { [Op.iLike]: `%${search}%` } },
            { address: { [Op.iLike]: `%${search}%` } },
        ];
    }
    try {
        const data = await projectModel.findAndCountAll({
            where: filter,
            offset: (page - 1) * limit,
            limit: limit,
            order: [orderFilter],
            attributes: { exclude: ["gallery", "video", "description"] },
        })
        const paginate = pagination(data.count, page, limit);
        res.send({ ...data, paginate });
    } catch (err) {
        throw customError(err)
    }
})
module.exports = {
    createProject,
    deleteProject,
    updateProject,
    getProject,
    getAllProject
}