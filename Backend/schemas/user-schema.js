const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'email id should be unique'],
        minlength:[1, 'email too small']
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;