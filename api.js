'use strict'

const db = require('./db')
const request = require('request-promise-native')

exports.search = async (req, res, next) => {
  const { term } = req.params
  const options = {
    url: 'https://www.googleapis.com/customsearch/v1',
    qs: {
      key: process.env.API_KEY,
      cx: process.env.CX,
      q: encodeURIComponent(term),
      searchType: 'image',
      start: (req.query.offset * 10) + 1 || 1
    },
    json: true
  }
  const { items } = await request(options)
  const latest = await db.create({ term: decodeURIComponent(term) })
  
  res.json(items.map(item => ({
    url: item.link,
    snippet: item.snippet,
    thumbnail: item.image.thumbnailLink,
    context: item.image.contextLink
  })))
}

exports.getRecent = async (req, res, next) => {
  res.json(await db.find().sort({ when: -1 }).limit(10))
}