const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdDate:{
    type: Date,
    required: true
  },
  comments:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: Number,
  comments_number: Number
});

const postModel = mongoose.model('Post', postSchema);
module.exports = postModel;
