const express = require('express');
const mongoose = require('mongoose')
const Post = require('../models/Post')




const router = express.Router();

router.get('/',async (req,res) =>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({errormsg:err})
    }
})
router.get('/post',(req,res) =>{
    res.send('We are on post in post')
})

router.post('/',(req,res) => 
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