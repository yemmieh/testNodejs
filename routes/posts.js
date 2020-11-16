const express = require('express');
const { TestScheduler } = require('jest');
const mongoose = require('mongoose')
const Post = require('../models/Post')
//const postData = require('./tests/postData')

const verify = require('./verifyToken');



const router = express.Router();


/**
 * @swagger
 * /posts/:
 *  get:
 *      description: mongodb post
 *      responses:
 *          '200':
 *              description: mongodb
 */
router.get('/',verify,async (req,res) =>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({errormsg:err})
    }
})
router.get('/post',verify,(req,res) =>{
    res.send('We are on post in post')
})


/**
 * @swagger
 * /posts/{postId}:
 *  parameters:
 *      - in: path
 *        name: postId
 *        type: string
 *        required: true
 *        description: pass postId to parameter
 *  get:
 *      description: get mongodb data by Id
 *      responses:
 *          '200':
 *              description: mongodb
 */
router.get('/:postId',verify,async (req,res) =>{
    try{
        console.log(req.params)
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({errormsg:err})
    }
})



/**
 * @swagger
 * /posts/{postId}:
 *  parameters:
 *      - in: path
 *        name: postId
 *        type: string
 *        required: true
 *        description: pass postId to parameter
 *  delete:
 *      description: delete mongodb data by Id
 *      responses:
 *          '200':
 *              description: mongodb
 */
router.delete('/:postId',verify,async (req,res) =>{
    try{
        console.log(req.params)
        const removePost = await Post.remove({_id:req.params.postId});
        res.json(removePost);
    }catch(err){
        res.json({errormsg:err})
    }
})



/**
* @swagger
*  /posts/{postId}:
*    patch:
*      summary: update mondo db data, takes parameter in path and body.
*      consumes:
*        - application/json
*      tags:
*        - update a Db data
*      parameters:
*        - in: body
*          name: user
*          description: update mondo db data.
*          schema:
*            type: object
*            required:
*              - title
*            properties:
*              title:
*                type: string
*      responses:
*        201:
*          description: mongodb data updated!
*/
router.patch('/:postId',verify,async (req,res) =>{
    try{
        console.log(req.params)
        console.log(req.body)
        const updatePost = await Post.updateOne({_id:req.params.postId},
            {$set:{title: req.body.title}});
        res.json(updatePost);
    }catch(err){
        res.json({errormsg:err})
    }
})

/**
* @swagger
*  /posts/:
*    post:
*      summary: create mondo db data.
*      consumes:
*        - application/json
*      tags:
*        - Create a new db data
*      parameters:
*        - in: body
*          name: user
*          description: add mondo db data.
*          schema:
*            type: object
*            required:
*              - description
*              - title
*            properties:
*              description:
*                type: string
*              title:
*                type: string
*      responses:
*        201:
*          description: mongodb data created!
*/
router.post('/',verify,(req,res) => 
{
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });
    post.save()
   // .exec()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err)
    })
    console.log("body",req.body)
    // res.send('We are on posts 2')
})

module.exports = router;