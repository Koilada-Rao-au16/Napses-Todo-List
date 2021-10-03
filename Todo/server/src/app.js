const express = require('express');
const DB  = require('./config/DB');
const cors = require("cors")
const app = express();


//setup for bodyparser
app.use(express.json());

//setup for cookie
app.use(cors())


//importing routes
const routes = require('./routes/register');
const todoRoutes = require('./routes/todo')

//using routes
app.use('/api', routes)
app.use('/api',todoRoutes)


//setup for port
app.listen(2000,()=>{
    console.log('listening on port 2000')
})


