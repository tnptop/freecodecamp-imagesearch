'use strict'

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const api = require('./api')

mongoose.connect(process.env.MONGO_URL)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})
app.get('/api/imagesearch/:term', api.search)
app.get('/api/latest/imagesearch', api.getRecent)

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})
