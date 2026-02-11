const { GoogleGenerativeAI } = require("@google/generative-ai");
const Quiz = require("../models/Quiz");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateQuiz = async (req, res) => {
  try {
    const { topic } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Generate 5 MCQ questions about ${topic}.
Return ONLY JSON:

{
 "title":"",
 "questions":[
  {
   "question":"",
   "options":["","","",""],
   "answer":""
  }
 ]
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const quizData = JSON.parse(text);

    const quiz = await Quiz.create({
      title: quizData.title,
      questions: quizData.questions,
      createdBy: req.user._id
    });

    res.json(quiz);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Quiz generation failed" });
  }
};
