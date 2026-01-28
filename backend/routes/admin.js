var express = require("express");
var router = express.Router();
const controller = require("../controllers/adminController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;
