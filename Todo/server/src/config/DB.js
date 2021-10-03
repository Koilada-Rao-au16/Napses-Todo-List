const mongoose = require('mongoose');
require('dotenv').config()


let db = mongoose.connect(process.env.MONGO_URI1,{useNewUrlParser:true , useUnifiedTopology:true},()=>{
    console.log("DB connected sucessfully")
})

module.exports = db;