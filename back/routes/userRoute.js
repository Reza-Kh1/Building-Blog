const express = require("express");
const isAdmin = require("../utils/isAdmin")
const {
  registerUser,
  getAllUser,
  getProfileUser,
  updateUser,
  deleteUser,
  loginUser,
  logOutUser,
  forgetPassword,
} = require("../controllers/userCtrl");
const routes = express.Router();
routes.route("/").get(isAdmin, getAllUser).post(isAdmin, registerUser);
routes.post("/login", loginUser);
routes.get("/logout", logOutUser)
routes.route("/forget-password").post(forgetPassword)
routes.route("/:id").get(getProfileUser).put(updateUser).delete(isAdmin, deleteUser);
module.exports = routes;
