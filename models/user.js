const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema({
    login:{
        type:String,
        unique:true,
        required:true
    },
    name:String,
    lastName:String,
    birthDate:Date,
    admin:{
        type:Boolean,
        required:true
});
module.exports = user;
