const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/friendsdb")

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to friends database")
});

const definition = {
    firstName: {
        type: String,
        required: [true, "Please provide firstName, lastName and age for the friend."]
    },
    lastName: {
        type: String,
        required: [true, "Please provide firstName, lastName and age for the friend."]
    },
    age: {
        type: Number,
        required: [true, "Please provide firstName, lastName and age for the friend."],
        min: [1, "Age must be a number between 1 and 120"],
        max: [120, "Age must be a number between 1 and 120"]
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}

const options = {
    timestamps: true
}

var friendSchema = new mongoose.Schema(definition, options)

var Friends = mongoose.model('Friend', friendSchema, 'friends')

module.exports = Friends