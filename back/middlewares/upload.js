const multer = require("multer");
const maxSize = 10 * 1000 * 1000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, process.env.URL_SAVE_IMAGE);
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadImage = multer({
  storage,
  limits: { fieldSize: maxSize },
}).single("image");
module.exports = uploadImage;
