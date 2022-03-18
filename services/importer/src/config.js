require('dotenv').config()

const HOST = process.env.HOST
const PORT = process.env.PORT

const MQ_URL = process.env.MQ_URL
const MONGO_URL = process.env.MONGO_URL
const MONGO_COLLECTION = process.env.MONGO_COLLECTION

const TOPIC_DRINKS = process.env.TOPIC_DRINKS

module.exports = { HOST, PORT, MQ_URL, MONGO_URL, MONGO_COLLECTION, TOPIC_DRINKS }
