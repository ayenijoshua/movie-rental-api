const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema =  mongoose.Schema(
    {
        name:{
            type:String,
            minlength: 5,
            maxlength: 50,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            maxlength:1024,
            required:true
        },
        isAdmin:{
            type:Boolean
        }
    },
)

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin:this.isAdmin},config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User',userSchema);

function validate(user){
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user)
}

function generateAuthToken(){

}

module.exports.User = User
module.exports.validate = validate