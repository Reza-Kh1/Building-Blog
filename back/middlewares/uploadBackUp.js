const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const backupFolder = path.join(__dirname, process.env.LOCATION_BACK_UP);
    cb(null, backupFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadBackUp = multer({ storage });
module.exports = uploadBackUp;
