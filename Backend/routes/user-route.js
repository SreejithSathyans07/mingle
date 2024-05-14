const express = require("express");
const router = express.Router();
const userModel = require('../schemas/user-schema');
const bcrypt = require('bcrypt');

router.get("/", async (req, res) => {
    const users = await userModel.find({});
    res.send(users)
});

router.post("/", async (req, res, next) => {
    try{
        const {body} = req;
        const user = new userModel(body);
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
        await user.save();
        res.send(user);

    }catch(e){
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const isDeleted = await userModel.findByIdAndDelete(id);
        res.send(isDeleted)
    }catch(e){
        next(e)
    }
})


module.exports = router;