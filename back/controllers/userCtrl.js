const { userModel } = require("../models/sync");
const errorHandler = require("express-async-handler");
const { customError } = require("../middlewares/globalError");
const { Op } = require("sequelize");
const token = require("jsonwebtoken");
const pagination = require("../utils/pagination");
const { createHash, comaprePassword } = require("../utils/hashPassword");
const createToken = require("../utils/createToken");
const nodemailer = require("nodemailer");
const limit = process.env.LIMIT;
const registerUser = errorHandler(async (req, res) => {
  let { name, phone, email, password, role } = req.body;
  let firstuser = false;
  if (!name || !phone || !email || !password)
    return res.status(400).send({ message: "تمام فیلد های لازم را پر کنید" });
  if (role) {
    try {
      const cookie = req.cookies?.user;
      const userInfo = token.verify(cookie, process.env.TOKEN_SECURITY);
      if (userInfo.role !== "ADMIN")
        throw customError("شما مجاز به انجام این عملیات نیستید");
    } catch (err) {
      if (err.message === "jwt must be provided")
        throw customError("دوباره وارد حساب کاربری خود شوید");
      throw customError(err.message, 403);
    }
  }
  try {
    const checkFirst = await userModel.findAll();
    if (!checkFirst.length) {
      firstuser = true;
      role = "ADMIN";
    }
    password = await createHash(password);
    const data = await userModel.create({ name, phone, email, password, role });
    const token = createToken(deletePass(data));
    if ((data.role !== "USER" && !role) || firstuser) {
      res.cookie("user", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    res.send({ token, ...deletePass(data) });
  } catch (err) {
    throw customError(err.message || err, 401);
  }
});
const getAllUser = errorHandler(async (req, res) => {
  let { role, search, page, order } = req.query;
  page = page || 1;
  let filter = {};
  let orderFilter = [];
  if (order) {
    const length1 = order.split("-")[0];
    const length2 = order.split("-")[1];
    orderFilter.push(length1);
    orderFilter.push(length2);
  } else {
    orderFilter.push(["createdAt", "DESC"]);
  }
  if (role !== undefined && role !== "all") {
    filter.role = role;
  }
  if (search) {
    filter[Op.or] = [
      { phone: { [Op.iLike]: `%${search}%` } },
      { name: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ];
  }
  try {
    const data = await userModel.findAndCountAll({
      where: filter,
      limit: limit,
      offset: (page - 1) * limit,
      order: [orderFilter],
      attributes: { exclude: ["password", "updatedAt"] },
    });
    const paginate = pagination(data.count, page, limit);
    res.send({ ...data, pagination: paginate });
  } catch (err) {
    throw customError(err.message, 400);
  }
});
const deleteUser = errorHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userModel.destroy({ where: { id } });
    if (!data) throw customError("کاربر حذف نشد");
    res.send({ success: true });
  } catch (err) {
    throw customError(err.message || err, 401);
  }
});
const getProfileUser = errorHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userModel.findByPk(id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    if (!data) throw customError("کاربر یافت نشد");
    res.send({ data });
  } catch (err) {
    throw customError(err.message, 403);
  }
});
const updateUser = errorHandler(async (req, res) => {
  let { email, password, name, phone, role } = req.body;
  const { id } = req.params;
  try {
    const update = await userModel.findByPk(id);
    if (!update) {
      throw customError("کاربر یافت نشد", 404);
    }
    if (email) {
      update.email = email;
    }
    if (password) {
      update.password = await createHash(password);
    }
    if (name) {
      update.name = name;
    }
    if (phone) {
      update.phone = phone;
    }
    if (role) {
      update.role = role;
    }
    await update.save();
    res.send({
      success: true,
      name: update.name,
      role: update.role,
      id: update.id,
    });
  } catch (err) {
    throw customError(err.message, 404);
  }
});
const loginUser = errorHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await userModel.findOne({ where: { email } });
    if (!checkUser)
      throw customError("کاربری با این ایمیل ثبت نام نکرده است!", 404);
    await comaprePassword(password, checkUser.password);
    const token = createToken(deletePass(checkUser));
    if (checkUser.role !== "USER") {
      res.cookie("user", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    res.send({ ...deletePass(checkUser), token });
  } catch (err) {
    throw customError(err.message, 403);
  }
});
const forgetPassword = errorHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const verify = await userModel.findOne({ where: { email } });
    if (!verify)
      throw new Error(
        "با این ایمیل کسی ثبت نام نکرده است لطفا ایمیل صحیح وارد کنید "
      );
    const newPass = [...Array(8)]
      .map((i) => (~~(Math.random() * 36)).toString(36))
      .join("");
    const transporter = nodemailer.createTransport({
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: "emailwebsite2024@gmail.com",
        pass: "hexh zbsk orwh tinr",
      },
    });
    const mailOptions = {
      from: "emailwebsite2024@gmail.com",
      to: email,
      subject: "باز نشانی رمز عبور ",
      text: `پس از ورود به حساب کاربری رمز عبور خود را تغییر دهید  .رمز عبور : ${newPass}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw customError(error, 404);
      }
    });
    verify.password = await createHash(newPass);
    verify.save();
    res.send({ message: "رمز عبور جدید به ایمیل شما ارسال شد" });
  } catch (err) {
    throw customError(err, 404);
  }
});
const logOutUser = errorHandler(async (req, res) => {
  res.cookie("user", "", { expires: new Date(0) });
  res.send({ success: true });
});
const deletePass = (data) => {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    id: data.id,
    role: data.role,
  };
};
module.exports = {
  logOutUser,
  forgetPassword,
  updateUser,
  registerUser,
  getAllUser,
  deleteUser,
  getProfileUser,
  loginUser,
};
