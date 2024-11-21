var express = require('express');
var router = express.Router({ mergeParams: true });

const Forum = require('../models/forum');
const User = require('../models/user');

router.get('/sessionlearning/:id', async(req, res) => {
    console.log(req.params.id);
    try{
        const forumPosts = await Forum.find({ SessionLearningID: req.params.id })
        .populate('UserID');
        res.json(forumPosts);
        console.error(forumPosts);
    } catch (error){
        console.error('Error fetching Forum:', error); // Log the actual error
        res.status(500).json({ error: 'Failed to fetch Forum', details: error.message });
    }
});

router.get('/forum/:id', async(req, res) => {
    console.log(req.params.id);
    try{
        const forumPosts = await Forum.find({ ForumID: req.params.id })
        .populate('UserID');
        res.json(forumPosts);
        console.error(forumPosts);
    } catch (error){
        console.error('Error fetching Forum:', error); // Log the actual error
        res.status(500).json({ error: 'Failed to fetch Forum', details: error.message });
    }
});

module.exports = router;