var express = require('express');
var router = express.Router();

const Course = require('../models/course');

// get all
router.get('/', async(req, res) => {
  try{
    const materials = await Course.find();
    res.json(materials);
  } catch (error){
    res.status(500).json({ error: 'Failed fetch course '});
  }
});

// create
router.post('/create', async(req, res) => {
    try{
        const newMaterial = await Course.create(req.body);
        res.status(201).json(newMaterial);
    } catch (error){
        res.status(500).json({ message: 'Error creating course', error });
    }
});

// update
router.put('/update/:id', async(req, res) => {
    try{
        const currMaterial = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!currMaterial) {
            return res.status(404).json({ message: 'Course not found' });
        }
        return res.status(200).json(currMaterial);
    } catch (error){
        res.status(500).json({ message: 'Error updating Course', error });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try{
        const currMaterial = await Course.findByIdAndDelete(req.params.id);
        if (!currMaterial) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(currMaterial);
    } catch (error){
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;
