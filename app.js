const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const app = express();

app.listen('3000')

//IMPORT ROUTES
const postRoute = require('./routes/posts')


//Middleware
app.use('/post',()=>{
    console.log('this is a middleware running')
})
app.use(bodyParser.json())
app.use('/posts',postRoute)

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology: true},()=>
    console.log('connected to DB eee!')
)

//ROUTES

app.get('/',(req,res)=>{
 res.send('we are on home')
});

app.get('/what',(req,res)=>{
    res.send('we are on what')
});
