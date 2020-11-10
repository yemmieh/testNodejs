const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Extended: https://swagger.oi/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:'Nodejs API Crash course',
            description:"Customer API Information",
            contact:{
                name: "Amazing Developer"
            },
            server:["http://localhost:3000"]
        }
    },
    apis:["./routes/*.js","app.js"]
    //apis:["app.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
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
// /**
//  * @swagger
//  * /:
//  *  get:
//  *      description: home url
//  *      responses:
//  *          '200':
//  *              description: a success response
//  */
// app.get('/',(req,res)=>{
//  res.status(200).send('we are on home')
// });

// /**
//  * @swagger
//  * /what:
//  *  get:
//  *      description: Get what return
//  *      responses:
//  *          '200':
//  *              description: a success response
//  */
// app.get('/what',(req,res)=>{
//     res.status(200).send('we are on what')
// });


app.listen('3000')