const mongoose = require('mongoose');

const definition = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
}

const options = {
  timestamps: true,
}

const Schema = new mongoose.Schema(definition, options)

const model = mongoose.model('Friend', Schema, 'friends');

module.exports = model;