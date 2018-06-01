const mongoose = require('mongoose');

// creating a schema

const definition = {
    
        firstName: {
            type: String,
            required: true,
            unique: true
        }, 
        lastName: {
            type: String,
            required: true
        }, 
        age: {
            type: Number,
            required: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        },
};


const options = {
    timestamps: true,
    strict:true

}
const friendSchema = new mongoose.Schema(definition, options)

module.exports = mongoose.model('Friends', friendSchema);