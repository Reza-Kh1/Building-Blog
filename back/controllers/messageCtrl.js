const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { messageModel, mediaModel } = require("../models/sync");
const pagination = require("../utils/pagination");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { dataBase } = require("../config/db");
const { Op } = require("sequelize");
const limit = process.env.LIMIT
const client = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
});
const createMessage = asyncHandler(async (req, res) => {
  const { name, phone, subject, text, images } = req.body;
  try {
    await messageModel.create({ name, phone, subject, text, images });
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const getMessage = asyncHandler(async (req, res) => {
  let { page, status, order } = req.query;
  statusFilter = {};
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
  if (status !== undefined) {
    statusFilter.status = status;
  }
  try {
    const data = await messageModel.findAndCountAll({
      where: statusFilter,
      limit: limit,
      offset: (page - 1) * limit,
      order: [orderFilter],
    });
    const paginate = pagination(data.count, page, limit);
    res.send({ ...data, paginate });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const transaction = await dataBase.transaction();
  try {
    const data = await messageModel.findByPk(id, { transaction });
    if (!data) throw customError("آیتم یافت نشد", 404);
    if (data.images.length) {
      await mediaModel.destroy({
        where: {
          url: {
            [Op.in]: data.images
          }
        },
        transaction
      });
      await Promise.all(
        data.images.map(async (i) => {
          console.log(i.split("/").slice(-1)[0]);
          await client.send(new DeleteObjectCommand({
            Bucket: process.env.LIARA_BUCKET_NAME,
            Key: decodeURIComponent(i.split("/").slice(-1)[0])
          }));
        })
      );
    }
    await data.destroy({ transaction });
    await transaction.commit();
    res.send({ success: true });
  } catch (err) {
    await transaction.rollback();
    throw customError(err, err.statusCode || 400);
  }
});
const updateMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await messageModel.findByPk(id);
    data.status = !data.status;
    await data.save();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
module.exports = {
  getMessage,
  deleteMessage,
  updateMessage,
  createMessage,
};
