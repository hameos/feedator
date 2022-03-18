require('dotenv').config()

const dbURL = process.env.DBURL
const HOST = process.env.HOST
const PORT = process.env.PORT


module.exports = { dbURL, HOST, PORT }