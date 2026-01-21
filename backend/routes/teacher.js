const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/teacherController.js');



router.post("/register", register);
router.post("/login", login);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
