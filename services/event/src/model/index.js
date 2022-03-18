const { EventSchema } = require('../schema')
const mongoose = require('mongoose')

const Event = mongoose.model('Event', EventSchema)
module.exports = { Event }
