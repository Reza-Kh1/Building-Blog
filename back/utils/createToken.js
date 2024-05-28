const token = require("jsonwebtoken")
const createToken = (value,) => {
    return token.sign(value, process.env.TOKEN_SECURITY, { expiresIn: "30d" })
}
module.exports = createToken