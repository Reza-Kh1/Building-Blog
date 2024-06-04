const token = require("jsonwebtoken");
const errorHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const isAuthor = errorHandler(async (req, res, next) => {
  const cookie = req.cookies?.user;
  try {
    const tokenUser = token.verify(cookie, process.env.TOKEN_SECURITY);
    if (tokenUser.role === "USER")
      throw customError("شما اجازه دسترسی به این بخش رو ندارید", 403);
    res.userInfo = tokenUser;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      throw customError("دوباره وارد حساب کاربری خود بشوید", 403);
    } else {
      throw customError(err.message, 403);
    }
  }
});
module.exports = isAuthor;
