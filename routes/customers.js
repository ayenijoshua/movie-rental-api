const express = require('express');
const router = express.Router();
const {Customer,validate} = require('../models/customer')



router.get('/', async (req,res)=>{
    //try {
        //console.log('Hi')
        const customers = await Customer.fin()

        //console.log(customers)
        return res.send(customers)
    //} catch (error) {
        console.error("Error",error)
        return res.status(500).send("An internal error occured")
        
    //}
})

router.post('/',async (req,res)=>{
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        let customer = new Customer({
            name: req.body.name,
            phone:req.body.phone,
            isGold:req.body.isGold
        })
        customer = await customer.save()
        res.send(customer)
    } catch (error) {
        console.error('Error',error)
        return res.status(500).send("An internal error occured")
    }
})

router.put('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        let customer = await Customer.findById(id)
        if(! customer){
            res.status(404).send("Id not found")
        }
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        customer = await Customer.findByIdAndUpdate(id)

        res.send(customer)
    } catch (error) {
        res.status(500).send("An internal error occured")
        console.error('Error',error)
    }
})

router.get('/:id',async (req,res)=>{
    try {
        const customer = findById(req.params.id)
        if(! customer){
            return res.status(404).send("Customer not found")
        }
        res.send(customer)
    } catch (error) {
        console.error("Error",error)
        res.status(500).send("An internal error occured");
    }
})



module.exports = router