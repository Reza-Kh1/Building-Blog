const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const dataBase = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      requestTimeout: 30000,
      encrypt: true,
    },
    logging: false,
  }
);
const connectDb = async () => {
  try {

    await dataBase.authenticate();
    console.log(`Connected to ${process.env.DB_DIALECT} database.`);
  } catch (err) {
    if (err.original && err.original.code === "3D000") {
      // کد خطا برای "Database does not exist"
      console.warn(
        `Warning: Database "${process.env.DB_NAME}" does not exist. Server will continue running.`
      );
    } else {
      console.error("Error connecting to the database:", err.message);
    }
  }
};

module.exports = { dataBase, connectDb };
