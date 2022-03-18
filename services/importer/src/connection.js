const { spawn } = require('child_process')
const mqtt = require('mqtt')

const { MQ_URL, MONGO_URL, MONGO_COLLECTION, TOPIC_DRINKS } = require('./config.js')

class MQConsumer {
  constructor(app) {
    this.app = app
    this.connected = false
    this.intHandle = null
    this.child = null
  }

  async connect() {
    if (this.connected) return
    this.client = mqtt.connect(MQ_URL)

    this.client.on('connect', () => {
      console.log('Connected to mq')
      this.connected = true

      this.client.subscribe(TOPIC_DRINKS, (err) => {
        if (err) {
          console.log('Error during subscribe:', err.message)
        }
      })

      this.client.on('message', (topic, message) => {
        // message is Buffer
        let value = JSON.parse(message)
        console.log('value received', value)

        this._launchChild(value.filename) //filename obtained from msg of mq
      })
    })

    this.client.on('error', (err) => {
      console.log('Error during mqtt connection', err.message)
    })
  }

  async _launchChild(file) {
    try {
      this.child = spawn('mongoimport',
      [`--uri=${MONGO_URL}`,
      `--collection=${MONGO_COLLECTION}`,
      '--drop',
      '--jsonArray',
      `--file=${file}`])

      console.log('Spawned new child importer - Importing...', file)

      this.child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })
        
      this.child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
      })
        
      this.child.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
      })
    }
    catch(err) {
      console.log('Error in funcion _launchChild', err.message)
    }
  }
}

module.exports = MQConsumer
