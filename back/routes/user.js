const express = require("express")
const userModel = require("../models/sync")
const route = express.Router();
route.get("/", async (req, res) => {
  const data = await userModel.findAll()
  res.send({ ok, data });
});
module.exports = route