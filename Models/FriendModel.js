const mongoose = require('mongoose');

const friend = {
        firstName: {
            type: String,
            require: true,
        },

        lastName: {
            type: String,
            require: true,
        },

        age: {
            type: Number,
            require: true,
            min: 1,
            max: 120,
        }, 

        createdOn: {
            type: Date,
            require: true,
            default: Date.now,
        }
}

const friendSchema = new mongoose.Schema(friend)

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;