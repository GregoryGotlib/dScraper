const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    search:{
        type:Array,
    },

    avatar:{
        type:String
    },

    date:{
        type:Date,
        default:Date.now
    },
});


module.exports = User = mongoose.model('users',UserSchema);