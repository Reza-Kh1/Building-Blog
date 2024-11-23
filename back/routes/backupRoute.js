const express = require("express");
const { createBackUp, restorebackUp,deleteAllTables, getAllBackUp, deleteSinglebackUp } = require("../controllers/backUpCtrl");
const uploadBackUp = require("../middlewares/uploadBackUp");
const app = express();
app.route("/").get(getAllBackUp).post(uploadBackUp.single("backUp"),restorebackUp).delete(deleteAllTables)
app.route("/create").get(createBackUp)
app.route('/delete').delete(deleteSinglebackUp)
module.exports = app;
