const mongoose       = require('mongoose')
const {mongoDB}      = require('../startup/mongodb')


const todoSchema = new mongoose.Schema({
    
    title:{
        type:           String,
        minlength:      1,
        maxlength:      100,
    },

    done:               {type:Date,default:null},


},{
    timestamps:         true,
});

const ToDo      = mongoDB.model('todo',todoSchema,'todo');
module.exports  = {ToDo};