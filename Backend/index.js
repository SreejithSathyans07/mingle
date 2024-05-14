const express = require('express');
const userRoute = require('./routes/user-route');
const authRoute = require('./routes/auth-route');
const postRoute = require('./routes/post-route');
const commentRoute = require('./routes/comment-route');
const app = new express();
const mongoose = require('mongoose');
const MingleError = require('./models/error-model');
const session = require('express-session');



mongoose.connect('mongodb://127.0.0.1:27017/mingle').then(()=>{
    console.log('connection successful');
},(err)=>{
    console.log('error occurred during db connection');
})

app.use(session({secret: 'mySecretKeyWord'}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('', authRoute)
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/comment', commentRoute);

app.use((err, req, res, next) => {
    let{errorMessage = 'Something went wrong', statusCode = 500} = err;
    if(err.message){
        errorMessage = err.message;
    }
    res.status(statusCode).send(new MingleError(errorMessage, statusCode));
    next(err);
})

app.listen(3000, ()=>{
    console.log('Mingle is listening on port 3000')
})