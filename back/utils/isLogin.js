const token = require("jsonwebtoken");
const isLogin = async (req, res, next) => {
  const cookie = req.cookies?.user;
  try {
    token.verify(cookie, process.env.TOKEN_SECURITY);
    res.isLogin = true;
    next();
  } catch (err) {
    res.isLogin = false;
    next();
  }
}
module.exports = isLogin;
