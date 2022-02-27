const express = require('express');
const router = express.Router();
const {User} = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

router.get('/', async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        let user = await User.findOne({email:req.body.email})
        if(! user) return res.status(400).send("Invalid email or apssword")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send("Invalid password")

        const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'))

        res.send(token)

    } catch (error) {
        console.error('Error',error)
        return res.status(500).send("An internal error occured")
    }
    
});

function validate(req){
    const schema = Joi.object().keys({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(req)
}

module.exports = router