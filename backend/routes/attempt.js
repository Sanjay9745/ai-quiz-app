const express = require("express");
const router = express.Router();
const { authMiddleware, roleMiddleware } = require("../middleware/auth");
const attemptController = require("../controllers/attemptController");

router.post(
  "/submit",
  authMiddleware,
  roleMiddleware(["student"]),
  attemptController.submitQuiz
);

module.exports = router;