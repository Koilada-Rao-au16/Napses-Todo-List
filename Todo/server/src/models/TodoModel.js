const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({

    userId: mongoose.Schema.ObjectId,
    name:{type:String,require:true},
    description:{type : String,require:true},
    time:{type:String,require:true},
    status:{type:Boolean,default:false}
})

module.exports = mongoose.model('Todos',TodoSchema)