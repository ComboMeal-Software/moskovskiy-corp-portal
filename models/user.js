const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    login:{
        type:String,
        unique:true,
        required:true
    },
    department:String,
    name:String,
    lastName:String,
    patronymic:String,
    position:String,
    password:String,
    avatar:String,
    admin:{
        type:Boolean,
        default:false,
    },
    CompletedTests:Number,
});
module.exports = mongoose.model('User',user);