require('dotenv').config();

var express = require('express');
var router = express.Router({ mergeParams: true });

const jwt = require('jsonwebtoken')
const User = require('../models/user');



const createToken = (_id) => {
  // Sementara disini dlu, .env nya ntah napa menggila gk bisa dipake
  SECRET = "mamamiyalezatosbryansangatluarbinasaaowkwowkowkkw"
  return jwt.sign({_id}, SECRET, { expiresIn:'1d'} )
}

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try{
    const newUser = await User.signin(email, password);

    const newToken = createToken(newUser._id);

    res.status(201).json({newUser, newToken});
  } catch (error){
    res.status(400).json({ error: error.message });
  }
});

router.post('/signup', async (req, res, next) => {
  
  const { email, password } = req.body;
  try{
    const newUser = await User.signup(email, password);

    const newToken = createToken(newUser._id);

    res.status(201).json({newUser, newToken});
  } catch (error){
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;



// router.get('/:id',async (req, res, next) => {
//   let status = 500;
//   const payload = { header: `Fetch User By ID`, message: ``, error: ``, data: null };
//   const userId = parseInt(req.params.id);
//   try {
//     const course = await User.findById(userId);

//     if (!course) {
//       status = 404;
//       payload.message = `Failed to fetch course`;
//       payload.error = `User ${userId} not found`;
//     } else {
//       status = 200;
//       payload.message = `Successfully fetched course`;
//       payload.data = course;
//     }
//   } catch (error) {
//     status = 500;
//     payload.message = `Failed to fetch course`;
//     payload.error = `Error fetching userId by ID: ${userId}`;
//   }

//   return res.status(status).json(payload);
// });