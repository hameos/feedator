const fs = require('fs')
const path = require('path')
const mqtt = require('mqtt')
const schedule = require('node-schedule')

const { MQ_URL, SHARED_FILENAME, VERSION_FILE, CRON_CONFIG, TOPIC_DRINKS, API_DRINKS } = require('./config.js')
const Api = require('./api.js')

class MQPublisher {
  constructor(app) {
    this.app = app
    this.job = null
    this.connected = false
  }

  async connect() {
    if (this.connected) return
    this.connected = true
    this.client = mqtt.connect(MQ_URL)

    this.client.on('connect', () => {
      console.log('Connected to mq')
      this.job = schedule.scheduleJob(CRON_CONFIG, this._jobfn)
    })

    this.client.on('error', (err) => {
      console.log('Error during mqtt connection', err.message)
    })
  }

  _jobfn = async () => {
    try {
      if (!this.client || !this.client.connected) {
        throw new Error('Not connected to MQ')
      }

      console.log("Syncing data from drinks API", API_DRINKS)
      const resp = await Api.getEvents()
      console.log("Response from drinks Api - Status", resp.status)

      if (resp.data) {
        const timestamp = Date.now().toString()
        const filename = SHARED_FILENAME.replace('{{TT}}', timestamp.toString())
        const folder = path.dirname(filename)

        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder)
          console.log('Created folder...', folder)
        }

        // Creating new datasource
        console.log('Creating new datasource', filename)
        fs.writeFileSync(filename, JSON.stringify(resp.data), { encoding: 'utf-8', flag: 'w' })

        // Read VERSION_FILE to get the old datasource filename
        let oldFilename = null

        try {
          oldFilename = fs.readFileSync(VERSION_FILE)
        } catch(err) {
          console.log('Error:', err.message)
          if (err.errno === -2)  { // not exists
            console.log(`${VERSION_FILE} not exist`)
          }
        }

        // Write new datasource filename into VERSION_FILE 
        fs.writeFileSync(VERSION_FILE, filename, { encoding: 'utf-8', flag: 'w' })

        // Deleting the old datasource
        if (oldFilename) {
          console.log('Deleting old datasource', oldFilename.toString())
          fs.rmSync(oldFilename)
        }

        const payload = {
          type: 'update',
          timestamp,
          filename
        }
        this.client.publish(TOPIC_DRINKS, JSON.stringify(payload))
        console.log('Message published', payload)
      }
    } catch (err) {
      console.log(`Error during interval`, err.message)
    }
  }
}

module.exports = MQPublisher
