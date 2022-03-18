const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const DB = require('./connection')

const { getEvents, getEvent } = require('./routes.js')

// Init express
let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging to a file
const logStream = fs.createWriteStream('./logs/access.log', { flags: 'a' })
app.use(morgan('common', { stream: logStream }))

// Init mongo
let db = new DB(app)
db.connect()

// Endpoints
app.get('/events', getEvents)
//app.get('/event/:eventId', getEvent)
