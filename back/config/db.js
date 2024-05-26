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
    console.log(`connect ${process.env.DB_DIALECT}`);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { dataBase, connectDb };