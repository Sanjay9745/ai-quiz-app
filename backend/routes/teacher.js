var express = require('express');
var router = express.Router();
const teacherController = require('../controllers/teacherController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", teacherController.register);
router.post("/login", teacherController.login);

module.exports = router;
