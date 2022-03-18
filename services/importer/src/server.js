const express = require('express')

const MQConsumer = require('./connection.js')
const { HOST, PORT } = require('./config.js')

// Init express
let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

  // Init mongo
let mq = new MQConsumer(app)
mq.connect()

app.listen(PORT, HOST, () => {
  console.log(`Importer service running ${HOST}:${PORT}`)
})
