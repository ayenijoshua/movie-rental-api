require('express-async-errors')
const helmet = require('helmet');
const winston = require('winston')
const express = require('express')
const startUpDebuger = require('debug')('app:startup')
const dbDebuger = require('debug')('app:db')
const app = express()
const config = require('config')

require('./startup/logging')(app)
require('./startup/db')() 
require('./startup/routes')(app)
require('./startup/config')()
require('./startup/validation')()

//app.use(express.static('public')) //serve static contents

//third party middlewares
app.use(helmet())

const PORT = config.get('PORT') || 3000

const server = app.listen(PORT, ()=>{winston.info(`App is running on ${PORT}`)})
//console.log(process.env.NODE_ENV)// similar to app.get('env')
module.exports = server