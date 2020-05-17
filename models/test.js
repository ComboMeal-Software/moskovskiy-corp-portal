const mongoose = require('mongoose');
const Question = require('./question').schema;
const Schema = mongoose.Schema;
var test = new Schema({
    title:String,
    dateRange:Date,
    questions:[Question],

});
module.exports = mongoose.model('Test',test);;