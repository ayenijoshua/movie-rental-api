const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema =  mongoose.Schema(
    {
        name:{
            type:String,
            minlength: 5,
            maxlength: 50,
            required:true
        },
        isGold:{
            type:Boolean,
            required:false
        },
        phone:{
            type:String,
            required:true,
            maxlength:50,
            minlength:5
        }
    },
)

const Customer = mongoose.model('Customer',customerSchema);

function validate(customer){
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50),
        isGold: Joi.boolean().optional()
    })

    return schema.validate(customer)
}

module.exports.Customer = Customer
module.exports.validate = validate