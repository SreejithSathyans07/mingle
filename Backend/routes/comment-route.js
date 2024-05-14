const express = require('express');
const router = express.Router();
const commentModel = require('../schemas/comment-schema');

router.post('/', async (req, res, next) => {
    try {
        const comment = new commentModel(req.body);
        const savedComment = await comment.save();
        res.send(savedComment);
    } catch (e) {
        next(e)
    }
})

router.get('/', async(req, res, next) => {
    try {
        const comments = await commentModel.find({}).populate('user_id', 'name');
        res.send(comments);
    } catch(e){
        next(e)
    }
})

router.get('/:commentId', async(req, res, next) =>{
    try {
        const {commentId} = req.params;
        const comment = await commentModel.findById(commentId)
        .populate({
            path:'post',
            select: ['text'],
            populate:{
                path:'user',
                select: 'name'
            }
        }).populate('user', 'name');
        res.send(comment);
    } catch (e) {
        next(e);
    }
})

router.get('/post/:postId', async(req, res, next) =>{
    try {
        const {postId} = req.params;
        const comment = await commentModel.find({post_id: postId})
        .populate({
            path:'post_id',
            select: ['text']
        }).populate('user_id', 'name');
        res.send(comment);
    } catch (e) {
        next(e);
    }
})

router.delete('/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        const deletedComment = await commentModel.findByIdAndDelete(id);
        res.send(deletedComment);
    } catch(e){
        next(e)
    }
})

module.exports = router;


