const bcrypt = require("bcryptjs")
const { customError } = require("../middlewares/globalError")
const createHash = (pass) => {
    return bcrypt.hashSync(pass, 10)
}
const comaprePassword = (pass, prevPass) => {
    try {
        return bcrypt.compare(pass, prevPass)
    } catch (err) {
        throw customError("پسورد وارد شده اشتباه است", 401)
    }
}
module.exports = {
    createHash,
    comaprePassword
}