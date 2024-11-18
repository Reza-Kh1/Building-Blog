const express = require("express");
const isAdmin = require("../utils/isAdmin")
const isAuthor = require("../utils/isAuthor")
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
routes.route("/").get(isAdmin, getAllUser).post(registerUser);
routes.post("/login", loginUser);
routes.get("/logout", logOutUser)
routes.route("/forget-password").post(forgetPassword)
routes.route("/:id").get(getProfileUser).put(isAuthor, updateUser).delete(isAdmin, deleteUser);
module.exports = routes;
