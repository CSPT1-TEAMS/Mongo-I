const mongoose = require('mongoose')
const definition = {
  firstName: String,
  lastName: String,
  age: {
    type: Number,
    min: [1, 'Sorry, no infants'],
    max: 120,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}

const options = {
  timestamps: true
}

const friendSchema = mongoose.Schema(definition, options)

module.exports = mongoose.model('Friend', friendSchema)
