const asyncHandler = require("express-async-handler");
const { onlinePriceModel, mediaModel } = require("../models/sync");
const { customError } = require("../middlewares/globalError");
const pagination = require("../utils/pagination");
const limit = process.env.LIMIT;
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { dataBase } = require("../config/db");
const { Op } = require("sequelize");
const client = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
});
const getOnlinePrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { order, status, page } = req.query;
  if (!page) page = 1;
  let orderFilter = [];
  let statusFilter = {};
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
    if (id) {
      const data = await onlinePriceModel.findByPk(id);
      res.send({ data });
    } else {
      const data = await onlinePriceModel.findAndCountAll({
        where: statusFilter,
        attributes: ["name", "phone", "subject", "status", "createdAt", "id"],
        offset: (page - 1) * limit,
        limit: limit,
        order: [orderFilter],
      });
      const paginate = pagination(data.count, page, limit);
      res.send({ ...data, paginate });
    }
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const createOnlinePrice = asyncHandler(async (req, res) => {
  const { name, phone, price, description, subject, images, size, status } =
    req.body;
  try {
    await onlinePriceModel.create({
      name,
      phone,
      price,
      description,
      subject,
      images,
      size,
      status,
    });
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
const deleteOnlinePrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const transaction = await dataBase.transaction();
  try {
    const data = await onlinePriceModel.findByPk(id, { transaction });
    if (!data) throw customError("همچین آیتمی موجود نیست!", 404);
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
const updateOnlinePrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await onlinePriceModel.findByPk(id);
    data.status = !data.status;
    await data.save();
    res.send({ success: true });
  } catch (err) {
    throw customError(err, err.statusCode || 400);
  }
});
module.exports = {
  getOnlinePrice,
  createOnlinePrice,
  deleteOnlinePrice,
  updateOnlinePrice,
};
