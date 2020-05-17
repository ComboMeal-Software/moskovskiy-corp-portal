const mongoose = require('mongoose');
var Question = require('./question');
const Schema = mongoose.Schema;
var test = new Schema({
    title:String,
    dateRange:Date,
    questions:[Question],

});
module.exports = test;