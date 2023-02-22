const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title:{
        type:String,
        required:true 
    },
    notes:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    status:String
})

const Taskdb = mongoose.model('taskdb',schema);

module.exports = Taskdb;