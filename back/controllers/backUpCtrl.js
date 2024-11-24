const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");
const { exec } = require("child_process");
const asyncHandler = require("express-async-handler");
const path = require("path");
const { Client } = require("pg");
const dbConfig = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
};
const client = new S3Client({
  region: "default",
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
});
const getAllBackUp = asyncHandler(async (req, res) => {
  try {
    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Prefix: "backups/",
    };
    const command = new ListObjectsV2Command(params);
    const response = await client.send(command);
    if (!response.Contents || response.Contents.length === 0) {
      return res.send({ success: true, backups: [] });
    }
    const sortedBackups = response.Contents.sort(
      (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
    ).map((file) => ({
      key: file.Key,
      url: `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${file.Key}`,
      lastModified: file.LastModified,
    }));
    res.send({ success: true, backups: sortedBackups });
  } catch (error) {
    res.status(500).send({ error: `Failed to list backups: ${error.message}` });
  }
});
const createBackUp = asyncHandler(async (req, res) => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, "-");
  const backupFileName = `backup_${timestamp}.dump`;
  const backupPath = path.join(
    __dirname,
    process.env.LOCATION_BACK_UP,
    backupFileName
  );
  const dumpCommand = `pg_dump -U ${dbConfig.user} -h ${dbConfig.host} -d ${dbConfig.database} -F c -f "${backupPath}"`;
  exec(dumpCommand, async (error, stdout, stderr) => {
    if (error) {      
      res.status(500).send({ error: `Backup failed: ${error.message}` });
      return;
    }
    if (stderr) {
      console.warn("pg_dump stderr:", stderr);
    }
    try {
      const fileContent = require("fs").createReadStream(backupPath);
      const uploadParams = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key: `backups/${backupFileName}`,
        Body: fileContent,
      };
      await client.send(new PutObjectCommand(uploadParams));      
      fs.unlink(backupPath, (err) => {
        if (err) {
          console.error("خطا در حذف فایل بکاپ:", err);
        }
      });
      res.send({
        success: true,
        message: "Backup created and uploaded successfully",
        fileUrl: `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/backups/${backupFileName}`,
      });
    } catch (uploadError) {
      res.status(500).send({ error: `Upload failed: ${uploadError.message}` });
    }
  });
});
const restorebackUp = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "فایل بکاپ ارسال نشده است" });
  }
  const restoreFilePath = path.normalize(
    path.join(__dirname, process.env.LOCATION_BACK_UP, req.file.originalname)
  );
  const restoreCommand = `pg_restore --clean --if-exists -U ${dbConfig.user} -d ${dbConfig.database} -h ${dbConfig.host} "${restoreFilePath}"`;
  exec(restoreCommand, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }
    if (stderr) {
      console.warn("pg_restore stderr:", stderr);
    }
    fs.unlink(restoreFilePath, (err) => {
      if (err) {
        console.error("خطا در حذف فایل بکاپ:", err);
      }
    });
    res.status(200).send({ success: true });
  });
});
const deleteAllTables = asyncHandler(async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public';
    `);
    const tables = result.rows.map((row) => row.tablename);
    if (tables.length === 0) {
      res.send({ msg: "هیچ جدولی یافت نشد" });
      return;
    }
    for (let table of tables) {
      await client.query(`TRUNCATE TABLE "${table}" CASCADE;`);
    }
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  } finally {
    await client.end();
  }
});
const deleteSinglebackUp = asyncHandler(async (req, res) => {
  const { key } = req.query;
  try {
    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: key,
    };
    await client.send(new DeleteObjectCommand(params));
    res.send({ success: true });
  } catch (err) {
    throw customError(err);
  }
});
module.exports = {
  createBackUp,
  restorebackUp,
  deleteAllTables,
  getAllBackUp,
  deleteSinglebackUp,
};
