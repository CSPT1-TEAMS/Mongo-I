const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const friendSchema = mongoose.Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    age : {type :Number,min : 1, max: 120},
    created_at : {type:Date,default: Date.now}
})

const FriendsModel = mongoose.model('Friend',friendSchema);

module.exports = FriendsModel