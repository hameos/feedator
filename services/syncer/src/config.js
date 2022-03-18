require('dotenv').config()

const HOST = process.env.HOST
const PORT = process.env.PORT

const MQ_URL = process.env.MQ_URL
const API_DRINKS = process.env.API_DRINKS

const VERSION_FILE = process.env.VERSION_FILE
const SHARED_FILENAME = process.env.SHARED_FILENAME

const CRON_CONFIG = process.env.CRON_CONFIG
const TOPIC_DRINKS = process.env.TOPIC_DRINKS

module.exports = { HOST, PORT, MQ_URL, API_DRINKS, VERSION_FILE, 
  SHARED_FILENAME, CRON_CONFIG, TOPIC_DRINKS }
