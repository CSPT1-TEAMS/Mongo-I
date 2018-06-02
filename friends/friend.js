const mongoose = require('mongoose');

const definition = {
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    age: {
        type: Number,
        required: true,
        min: [1, "Age must be greater than 1"],
        max: [120, "Age must be less than 1"]
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    contactInfo: {
        type: Array
    }
}

const options = {
    timestamps: true
}

const friendSchema = new mongoose.Schema(definition, options);

module.exports = mongoose.model('Friend', friendSchema);