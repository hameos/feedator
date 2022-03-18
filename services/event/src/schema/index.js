const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = {
 "_id": false,
  "name": {
    "type": String
  },
  "avatarUrl": {
    "type": String
  }
}

const EventComment = {
  "_id": false,
  "user": {
    "type": User
  },
  "timestamp": {
    "type": Date
  },
  "message": {
    "type": String
  }
}

const EventLocation = {
  "_id": false, // Dont add _id to subdocuments
  "name": {
    "type": String
  },
  "latitude": {
    "type": Number
  },
  "longitude": {
    "type": Number
  }
}

const Event = {
  "_id": Number, // Make it optional so that can be removed when creating the schema
  "id": {
    "type": Number,
    "unique": true,
    "required": true,
  },
  "type": {
    "type": String,
    "enum": ["BEERS", "COCKTAILS", "COFFEES", "MILKSHAKES"]
  },
  "time": {
    "type": Date
  },
  "title": {
    "type": String
  },
  "location": {
    "type": EventLocation
  },
  "creator": {
    "type": User,
  },
  "guests": {
    "type": [ User ]
  },
  "comments":{
    "type": [ EventComment ]
  }
}

const EventSchema = new Schema(Event, {_id: false }) //, versionKey: false })
module.exports = { EventSchema }
