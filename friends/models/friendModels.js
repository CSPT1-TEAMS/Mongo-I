// grab what we need

const mongoose = require('mongoose') // Require Mongoose
// Define Schema
const Schema = mongoose.Schema
const FriendSchema = new Schema({
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
})
// Compile model from schema
const FriendModel = mongoose.model('FriendModels', FriendSchema)

// Export function to create "FriendModel" model class
module.exports = mongoose.model('FriendModel', FriendSchema)
