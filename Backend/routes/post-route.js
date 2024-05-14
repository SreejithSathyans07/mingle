const express = require('express');
const router = express.Router();
const postModel = require('../schemas/post-schema');
const Response = require('../models/response-model');
const commentModel = require('../schemas/comment-schema');

router.post('/', async (req, res, next)=>{
    try {
        const post = new postModel(req.body);
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (e) {
        next(e);
    }
})

router.get('/', async(req, res, next) =>{
    try {
        const posts = await postModel.find({}).populate('user_id', 'name');
        res.send(posts);
    } catch (e) {
        next(e)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try {
        const {id} = req.params;
        const deletedPost = await postModel.findByIdAndDelete(id);
        const deleteComments = await commentModel.deleteMany({post_id : id});
        res.send('post deleted successfully'); 
    } catch (e) {
        next(e);
    }
})

module.exports = router;