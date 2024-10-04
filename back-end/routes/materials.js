var express = require('express');
var router = express.Router();

const Material = require('../models/material');

// get all
router.get('/', async(req, res) => {
  try{
    const materials = await Material.find();
    res.json(materials); 
  } catch (error){
    res.status(500).json({ error: 'Failed fetch materials '});
  }
});

// create
router.post('/create', async(req, res) => {
    try{
        const newMaterial = await Material.create(req.body);
        res.status(201).json(newMaterial);
    } catch (error){
        res.status(500).json({ message: 'Error creating materials', error });
    }
});

// update
router.put('/update/:id', async(req, res) => {
    try{
        const currMaterial = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!currMaterial) {
            return res.status(404).json({ message: 'Material not found' });
        }
    } catch (error){
        res.status(500).json({ message: 'Error updating materials', error });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try{
        const currMaterial = await Material.findByIdAndDelete(req.params.id);
        if (!currMaterial) {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.status(200).json(currMaterial);
    } catch (error){
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;
