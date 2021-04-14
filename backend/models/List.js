const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({ // schema da Collection
  title: {type: String, required: true},
  description: String,
  image: String,
  favorite: {type: Boolean, default: false}
})

module.exports = mongoose.model('List', listSchema)