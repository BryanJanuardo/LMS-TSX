var express = require('express');
var router = express.Router();

const CourseLearning = require('../models/courselearning');

// get all
router.get('/', async (req, res) => {
  try {
    const courseLearning = await CourseLearning.find()
      .populate('CourseID')
      .populate([
        {
          path: 'SessionLearningID',
          populate: [
            { path: 'SessionID', model: 'Session' },
            { path: 'MaterialID', model: 'Material' },
            { path: 'TaskID', model: 'Task' }
          ]
        }
      ]);
    res.json(courseLearning);
  } catch (error) {
    console.error('Error fetching CourseLearning:', error); // Log the actual error
    res.status(500).json({ error: 'Failed to fetch CourseLearning', details: error.message });
  }
});

// get by id
router.get('/:id', async(req, res) => {
  try{
    const courseLearning = await CourseLearning.findById(req.params.id)
    .populate('CourseID')
    .populate([
      {
        path: 'SessionLearningID',
        populate: [
          { path: 'SessionID', model: 'Session' },
          { path: 'MaterialID', model: 'Material' },
          { path: 'TaskID', model: 'Task' }
        ]
      }
    ]);
    res.json(courseLearning);
  } catch (error){
    res.status(500).json({ error: 'Failed fetch CourseLearning '});
  }
});

// create
router.post('/create', async(req, res) => {
    try{
        const newCourseLearning = await CourseLearning.create(req.body);
        res.status(201).json(newCourseLearning);
    } catch (error){
        res.status(500).json({ message: 'Error creating CourseLearning', error });
    }
});

// update
router.put('/update/:id', async(req, res) => {
    try{
        const currCourseLearning = await CourseLearning.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!currCourseLearning) {
            return res.status(404).json({ message: 'CourseLearning not found' });
        }
        return res.status(200).json(currCourseLearning);
    } catch (error){
        res.status(500).json({ message: 'Error updating CourseLearning', error });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try{
        const currCourseLearning = await CourseLearning.findByIdAndDelete(req.params.id);
        if (!currCourseLearning) {
            return res.status(404).json({ message: 'CourseLearning not found' });
        }
        res.status(200).json(currCourseLearning);
    } catch (error){
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;
