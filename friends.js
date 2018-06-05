const mongoose = require('mongoose');

const definition = {
  firstName: { 
    type: String,
    default: 'Jane',
    required: true
  },
  lastName: {
    type: String,
    default: 'Doe',
    required: true
  },
  age: {
    type: Number,
    min: 1,
    max: 120
    // required: true // error when requiring age?
  }, 
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
}

const options = {
  timestamps: true,
  strict: false
} 

const friendSchema = mongoose.Schema(definition, options);

module.exports = mongoose.model('Friend', friendSchema);