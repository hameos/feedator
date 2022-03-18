const axios = require('axios')
const { API_DRINKS } = require('./config')

const getEvents = async () => {
  return axios.get(API_DRINKS, { timeout: 8000 })
}

module.exports= { getEvents }
