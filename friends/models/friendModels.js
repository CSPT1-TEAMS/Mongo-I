// grab what we need

const mongoose = require('mongoose') // Require Mongoose
const Schema = mongoose.Schema // Define Schema

// create a schema
const FriendSchema = new Schema({
  firstName: String, // String, required
  lastName: String, // String, required
  age: { // Number, required, should be an integer between 1 and 120
    type: Number,
    min: [1, 'Sorry, no infants'],
    max: 120,
    required: true

  createdAt: { type: Date, default: Date.now }, // creation date, required, defaults to current date
  updatedAt: { type: Date, default: Date.now } // update date, required, defaults to current date
})

// Export function to create "FriendModel" model class
module.exports = mongoose.model('FriendModel', FriendSchema)
