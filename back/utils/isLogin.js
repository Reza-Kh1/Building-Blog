const token = require("jsonwebtoken");
const errorHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const isLogin = errorHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  const cookie = req.cookies.user;
  if (!authorization && !cookie)
    throw customError("لطفا دوباره وارد حساب کاربری خود شوید", 403);
  try {
    if (authorization) {
      const verify = authorization.split(" ")[1];
      const userInfo = token.verify(verify, process.env.TOKEN_SECURITY);
      res.userInfo = userInfo;
    } else {
      const userInfo = token.verify(cookie, process.env.TOKEN_SECURITY);
      res.userInfo = userInfo;
    }
    next();
  } catch (err) {
    throw customError("لطفا دوباره وارد حساب کاربری خود شوید", 400);
  }
});
export default isLogin;
