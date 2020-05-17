const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    login:{
        type:String,
        unique:true,
        required:true
    },
    department:String,
    phoneNumber:String,
    name:String,
    lastName:String,
    patronymic:String,
    birthDate:Date,
    password:String,
    avatar:String,
    admin:{
        type:Boolean,
        required:true
    },
    CompletedTests:Number,
});
module.exports = mongoose.model('User',user);