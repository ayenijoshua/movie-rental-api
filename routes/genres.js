const express = require('express');
const router = express.Router();
const {Genre,validate} = require('../models/genres')
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const mongoose = require('mongoose');
const validateObjectId = require('../middlewares/validateObjectId')
const auth = require('../middlewares/authMiddleware')

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    try {
        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        const genre = new Genre({name:req.body.name});
        const result = await genre.save();
        // if(!genre){
        //     res.status(400).send("An error occured, please try again")
        // }
        res.send(result);
    } catch (error) {
        return res.status(500).send("An internal error occured")
        console.error('Error',error)
    }
  
});

router.put('/:id', async (req, res) => {
    try {
        const {error} = validate(req.body)

        const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
            new:true
        })

        if (!genre) return res.status(404).send('The genre with the given ID was not found.');

        if (error) return res.status(400).send(error.details[0].message);
        
        res.send(genre);

    } catch (error) {
        res.status(500).send("An internal error occured")
        console.error('Error',error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id)
  
        if (!genre) return res.status(404).send('The genre with the given ID was not found.');

        res.send(genre);
    } catch (error) {
        res.status(500).send("An internal error occured")
        console.error('Error',error)
    }
    
});

router.get('/:id', validateObjectId, async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).send('The genre with the given ID was not found.');
        }

        const genre = await Genre.findById(req.params.id)
  
        if (!genre) return res.status(404).send('The genre with the given ID was not found.');

        res.send(genre);
    } catch (error) {
        res.status(500).send("An internal error occured")
        console.error('Error',error)
    }
    
});

module.exports = router;