const asyncHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { S3Client, DeleteObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const client = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
});

const uploadImage = asyncHandler(async (req, res) => {
  if (req.file == undefined) throw customError("هیچ عکسی انتخاب نشده", 401);
  try {
    return res.send({ url: req.file.location });
  } catch (error) {
    throw customError(error.message, 400);
  }
});
const deleteImage = asyncHandler(async (req, res) => {
  const { url } = req.query;
  const key = url.split("/").slice(-1)[0];
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: key,
  };
  try {
    await client.send(new DeleteObjectCommand(params));
    res.send({ success: true });
  } catch (error) {
    throw customError(error.message, 400);
  }
});
const getAllImage = asyncHandler(async (req, res) => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
  };
  try {
    const data = await client.send(new ListObjectsV2Command(params));
    const files = data.Contents.map((file) => file.Key);
    const urls = files.map((i) => {
      return process.env.URL_IMAGE_LIARA + i
    })
    res.send(urls);
  } catch (err) {
    throw customError(err, 400);
  }
});
module.exports = {
  deleteImage,
  uploadImage,
  getAllImage,
};