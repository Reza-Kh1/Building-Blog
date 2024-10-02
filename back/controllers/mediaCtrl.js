const asyncHandler = require("express-async-handler")
const { mediaModel } = require("../models/sync")
const { customError } = require("../middlewares/globalError");
const { dataBase } = require("../config/db");
const {
    S3Client,
    DeleteObjectCommand,
    ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const pagination = require("../utils/pagination");
const client = new S3Client({
    region: "default",
    endpoint: process.env.LIARA_ENDPOINT,
    credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY,
    },
});
const createMedia = asyncHandler(async (req, res) => {
    const { url, thumbnail, type, status } = req.body
    try {
        await mediaModel.create({ url, thumbnail, type, status })
        res.send({ success: true })
    } catch (err) {
        throw customError(err)
    }
})
const deleteMedia = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const transaction = await dataBase.transaction()
        const media = await mediaModel.findByPk(id, { transaction })
        const key = media?.url.split("/").slice(-1)[0];
        await media.destroy(transaction)
        const params = {
            Bucket: process.env.LIARA_BUCKET_NAME,
            Key: key,
        };
        await client.send(new DeleteObjectCommand(params));
        await transaction.commit()
        res.send({ success: true })
    } catch (err) {
        throw customError(err)
    }
})
const getAllMedia = asyncHandler(async (req, res) => {
    let { page, order, status } = req.query;
    page = page || 1;
    let orderFilter = [];
    if (order) {
        const length1 = order.split("-")[0];
        const length2 = order.split("-")[1];
        orderFilter.push(length1);
        orderFilter.push(length2);
    } else {
        orderFilter.push(["createdAt", "DESC"]);
    }
    try {
        const data = await mediaModel.findAndCountAll({
            where: { status: status || false },
            offset: (page - 1) * limit,
            limit: limit,
            order: [orderFilter],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        const paginate = pagination(data.count, page, limit);
        res.send({ ...data, paginate });
    } catch (err) {
        throw customError(err)
    }
})
const getAsDataBase = asyncHandler(async (req, res) => {
    const { next } = req.query;
    const params = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        MaxKeys: 2,
        ContinuationToken: next,
    };
    try {
        const data = await client.send(new ListObjectsV2Command(params));
        const files = data?.Contents?.map((file) => file.Key);
        const urls = files?.map((i) => {
            return process.env.URL_IMAGE_LIARA + i;
        });
        res.send({ urls, next: data.NextContinuationToken });
    } catch (err) {
        throw customError(err)
    }
})
module.exports = {
    createMedia,
    deleteMedia,
    getAllMedia,
    getAsDataBase
}