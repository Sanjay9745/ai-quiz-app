const express = require("express");
const router = express.Router();
const { authMiddleware, roleMiddleware } = require("../middleware/auth");
const quizController = require("../controllers/quizController");

router.post(
  "/generate",
  authMiddleware,
  roleMiddleware(["teacher"]),
  quizController.generateQuiz
);

module.exports = router;
