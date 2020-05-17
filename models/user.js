const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    login:{
        type:String,
        unique:true,
        required:true
    },
    name:String,
    lastName:String,
    birthDate:Date,
    password:String,
    admin:{
        type:Boolean,
        required:true
    }
});
module.exports = mongoose.model('User',user);;