const http = require("http")
const dotenv = require("dotenv")
const app = require("./app/app.js")
dotenv.config();
const server = http.createServer(app);
server.listen(process.env.PORT_SERVER, process.env.HOST_NAME, () => {
  console.log(`server run in port ${process.env.PORT_SERVER}`);
});