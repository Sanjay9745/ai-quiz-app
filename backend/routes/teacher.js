const bcrypt = require('bcrypt');
const User = require('../db/User');



var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new User({
      name,
      email,
      password: hashedPassword,
      role: 'student'
    });

    await newStudent.save();

    res.status(201).json({
      message: 'Student registered successfully'
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
