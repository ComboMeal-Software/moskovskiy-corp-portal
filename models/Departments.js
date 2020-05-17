const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departments = new Schema({
id:{
    type:Number,
    required:true,
    unique:true,
},
name:String,
});
module.exports = mongoose.model('Departments',departments);;