const { Event } = require('./model')

const getEvents = async (req, res) => {
  console.log(`[EVENT SERVICE] GET ${req.url}`)
  let query = null

  try {
    let searchText = req.query.search ? String(req.query.search) : ''
    if (searchText) {
      const exp =  { 
        $or: [
          { 'title': { $regex: '.*' + searchText + '.*' } },
          { 'location.name' : { $regex: '.*' + searchText + '.*' }},
        ]
      }
      query = Event.find(exp)
    } else {
      query = Event.find()
    }

    query.sort({id:1})

    let pageNum = Number(req.query.page)
    let pageSize = Number(req.query.pageSize)
    if (!isNaN(pageNum) && !isNaN(pageSize)) {
      if ((0 < pageNum) && (0 < pageSize)) {
        query.skip((pageNum-1)*(pageSize))
        query.limit(pageSize)
      }
    }

    const listEvent = await query.exec()
    return res.status(200).json(listEvent)
  } catch (err) {
    const data = { success: false, msg: err.message }
    console.log('Error Response status=400, data=', data)
    return res.status(400).json(data)
  }
}

module.exports = {
  getEvents,
}
