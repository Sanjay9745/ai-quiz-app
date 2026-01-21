const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/student-controller');
// const {authMiddleware} = require('../middleware/auth');
// const {roleMiddleware} = require('../middleware/auth');


router.post('/register', register);
router.post('/login',login);

module.exports = router;