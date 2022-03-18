const mongoose = require('mongoose')
const { dbURL, HOST, PORT } = require('./config')

class DB {
  constructor(app) {
    this.app = app
  }

  async connect() {
    try {
      let result = await mongoose.connect(dbURL)
      console.log('Connected to db')

      this.app.listen(PORT, HOST, () => {
        console.log(`User service running ${HOST}:${PORT}`)
      })

    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = DB
