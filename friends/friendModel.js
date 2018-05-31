const express = require('express');
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
    required: [true, "Age is required"],
    min: [1, "Age must be greater then 1"],
    max: [120, "Age must be less then 120"]
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
}

const options = {
  timestamps: true
};

const friendSchema = mongoose.Schema(definition, options);

const friendModel = mongoose.model('Friend', friendSchema, 'friends');

module.exports = friendModel;