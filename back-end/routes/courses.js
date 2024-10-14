var express = require('express');
var router = express.Router();

const Course = require('../models/course');

// get all
router.get('/', async(req, res) => {
  try{
    const courses = await Course.find();
    res.json(courses);
  } catch (error){
    res.status(500).json({ error: 'Failed fetch course '});
  }
});

// get by id
router.get('/:id', async(req, res) => {
    console.log(req.params.id);
    try{
        const course = await Course.findById(req.params.id);
        res.json(course);
    } catch (error){
        res.status(500).json({ error: 'Failed fetch Course '});
    }
});

// create
router.post('/create', async(req, res) => {
    try{
        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (error){
        res.status(500).json({ message: 'Error creating course', error });
    }
});

// update
router.put('/update/:id', async(req, res) => {
    try{
        const currCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!currCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        return res.status(200).json(currCourse);
    } catch (error){
        res.status(500).json({ message: 'Error updating Course', error });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try{
        const currCourse = await Course.findByIdAndDelete(req.params.id);
        if (!currCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(currCourse);
    } catch (error){
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;
