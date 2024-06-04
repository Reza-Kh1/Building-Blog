const bcrypt = require("bcryptjs");
const { customError } = require("../middlewares/globalError");
const createHash = async (pass) => {
  return bcrypt.hashSync(pass, 10);
};
const comaprePassword = async (pass, prevPass) => {
  try {
    const checkPass = await bcrypt.compare(pass, prevPass);
    if (!checkPass) throw customError("پسورد وارد شده اشتباه است");
    return checkPass;
  } catch (err) {
    throw customError(err.message, 403);
  }
};
module.exports = {
  createHash,
  comaprePassword,
};
