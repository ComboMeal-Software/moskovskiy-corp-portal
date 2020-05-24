const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var question = new Schema({
    number:{
        type:Number,
        unique:true,
    },
    value:{
        type:String,
        require:true,
    },
    correct:{
        type:Boolean,
        require:true,
    },
    
});
module.exports = mongoose.model('Question',question);