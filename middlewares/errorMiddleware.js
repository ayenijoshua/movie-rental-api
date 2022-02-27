const winston = require('winston')

module.exports = function(err,req,res,next){
    //console.error('Error',err) 
    winston.log('error',err)
    res.status(500).send({message:"Something failed"})
}
