const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();


// ================= REGISTER TEACHER =================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new User({
      name,
      email,
      password: hashedPassword,
      role: 'teacher'
    });

    await teacher.save();

    res.status(201).json({ message: 'Teacher registered successfully' });

  } catch (error) {
    console.error("TEACHER REGISTER ERROR:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ================= LOGIN TEACHER =================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await User.findOne({ email, role: 'teacher' });
    if (!teacher) {
      return res.status(400).json({ message: 'Teacher not found' });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: teacher._id, role: teacher.role },
      process.env.SECRET_KEY, // matches your .env
      { expiresIn: '1d' }
    );

    res.json({ token, message: 'Login successful' });

  } catch (error) {
    console.error("TEACHER LOGIN ERROR:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
