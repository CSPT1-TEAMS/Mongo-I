const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
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
  },
  createdOn: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Friend', FriendSchema);