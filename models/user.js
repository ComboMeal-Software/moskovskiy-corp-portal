const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema({
    login:{
        type:String,
        unique:true,
    },
    name:String,
    lastName:String,
    birthDate:Date,
    admin:Boolean,
});
module.exports = user;