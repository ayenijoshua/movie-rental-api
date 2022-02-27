const mongoose = require('mongoose');
const Joi = require('joi')

const genreSchema =  mongoose.Schema(
    {
        name:{
            type:String,
            minlength: 5,
            maxlength: 50,
            required:true
        }
    },
)

const Genre = mongoose.model('Genre',genreSchema);

function validate(genre) {
    const schema = Joi.object().keys({
      name: Joi.string().min(5).max(50).required()
    });
  
    return schema.validate(genre);
}

module.exports.Genre = Genre
module.exports.genreSchema = genreSchema
module.exports.validate = validate