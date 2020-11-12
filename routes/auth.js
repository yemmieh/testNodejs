const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv/config')
const {userRegisterValidation,userLoginValidation} = require('../models/validations')

const router = express.Router();

/**
* @swagger
*  /auth/register:
*    post:
*      summary: register User.
*      consumes:
*        - application/json
*      tags:
*        - User
*      parameters:
*        - in: body
*          name: user
*          description: register User.
*          schema:
*            type: object
*            required:
*              - name
*              - email
*              - password
*            properties:
*              name:
*                type: string
*              email:
*                type: string
*              password:
*                type: string
*      responses:
*        201:
*          description: register User.
*/
router.post('/register', async(req,res) => 
{ 
    //LETS VALIDATE THE DATA BEFORE WE ADD USER
    const { error } = userRegisterValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is in database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email Already Exist');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hasspassword = await bcrypt.hash(req.body.password,salt);
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hasspassword
    });
    try{
        const saveUser = await user.save()
        res.status(200).json(saveUser);
    }catch(err){
        res.status(400).json({errormsg:err})
    }
})


/**
* @swagger
*  /auth/login:
*    post:
*      summary: login User.
*      consumes:
*        - application/json
*      tags:
*        - User
*      parameters:
*        - in: body
*          name: user
*          description: login User.
*          schema:
*            type: object
*            required:
*              - email
*              - password
*            properties:
*              email:
*                type: string
*              password:
*                type: string
*      responses:
*        201:
*          description: login User.
*/
router.post('/login', async(req,res) => 
{ 
    try{
        //LETS VALIDATE THE DATA BEFORE WE ADD USER
        const { error } = userLoginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Check if user is in database
        const userData = await User.findOne({email:req.body.email});
        if(!userData) return res.status(400).send('Email or password is wrong');

        //CHECK PASSWORD
        const validpass = await bcrypt.compare(req.body.password,userData.password);
        if(!validpass) return res.status(400).send('Invalid password');
        
        //Create and assign a token
        const token = jwt.sign({_id:userData._id,name:userData.name},process.env.TOKEN_SECRET);
        res.header('auth-token',token);
        
        res.status(200).json(token);

    }catch(err){
        res.status(400).json({errormsg:err})
    }
})

module.exports = router;