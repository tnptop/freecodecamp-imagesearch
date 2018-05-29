'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema({
  term: {
    type: String,
    require: true
  },
  when: {
    type: Date,
    require: true,
    default: new Date
  }
}, {
  toJSON: {
    transform: function (doc, obj) {
      delete obj.__v
      delete obj._id
      return obj
    }
  }
})
module.exports = mongoose.model('ImageSearchHistory', schema)