const {User} = require('../../../models/user')
const mongoose = require('mongoose')
const auth = require('../../../middlewares/authMiddleware')
const _ = require('lodash')
const { property } = require('lodash')

describe('auth middleware',()=>{
    it('should populate req.user with the payload of a valid JWT', ()=>{
        const payload = {
            _id:mongoose.Types.ObjectId().toHexString(),
            isAdmin:true,
            name:'josh',
            email:'josh@mail.com',
            password:'1234'
        }
        const token = new User(payload).generateAuthToken()

        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = {}
        const next = jest.fn()

        auth(req,res,next)
        
        expect(req.user).toMatchObject(_.pick(payload,['_id','isAdmin'])) 


    })
})