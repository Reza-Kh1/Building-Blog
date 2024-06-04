const express = require("express");
const {
  registerUser,
  getAllUser,
  getProfileUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userCtrl");
const routes = express.Router();
routes.route("/").get(getAllUser).post(registerUser);
routes.route("/:id").get(getProfileUser).put(updateUser).delete(deleteUser);
routes.post("/login", loginUser);
module.exports = routes;
