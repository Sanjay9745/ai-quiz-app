const Attempt = require("../models/Attempt");
const Quiz = require("../models/Quiz");

exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;

    quiz.questions.forEach((q, index) => {
      if (q.answer === answers[index]) score++;
    });

    const attempt = await Attempt.create({
      student: req.user._id,
      quiz: quizId,
      answers,
      score,
      total: quiz.questions.length
    });

    res.json({
      score,
      total: quiz.questions.length,
      attempt
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Submission failed" });
  }
};
