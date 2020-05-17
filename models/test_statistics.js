const mongoose = require('mongoose');
var Question = require('question');
const Schema = mongoose.Schema;
var test_statistics = new Schema({
    number:Number,
    user:String,
    values:[String],
});
module.exports = mongoose.model('Test_statistics',test_statistics);;