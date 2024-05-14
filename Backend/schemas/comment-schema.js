const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    post_id:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdDate: {
        type: Date,
        required: true
    }
})

const commentModel = mongoose.model('Comment', commentSchema);
module.exports = commentModel;