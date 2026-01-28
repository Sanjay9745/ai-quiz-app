import { useEffect, useState } from "react";
import { fetchQuizQuestions } from "../api";
import { filterQuizResponse } from "../utils/filterQuiz";

const QUESTION_TIME = 15; // seconds per question

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  useEffect(() => {
    async function loadQuiz() {
      const data = await fetchQuizQuestions();
      const cleanData = filterQuizResponse(data);
      setQuestions(cleanData.questions);
    }
    loadQuiz();
  }, []);

  // Timer logic
  useEffect(() => {
    if (showResult) return;

    if (timeLeft === 0) {
      handleNext(); // auto move if time runs out
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showResult]);

  function handleOptionClick(optionKey) {
    if (selectedOption) return;

    setSelectedOption(optionKey);

    if (optionKey === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  }

  function handleNext() {
    setSelectedOption(null);
    setTimeLeft(QUESTION_TIME);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  }

  if (questions.length === 0) return <p>Loading quiz...</p>;

  if (showResult) {
    return (
      <div>
        <h2>Quiz Finished 🎉</h2>
        <p>Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h2>JavaScript Quiz</h2>

      <p><strong>Question {currentIndex + 1} of {questions.length}</strong></p>

      {/* Timer Display */}
      <p style={{ color: timeLeft <= 5 ? "red" : "black" }}>
        ⏳ Time Left: {timeLeft}s
      </p>

      <p>{currentQuestion.question}</p>

      {Object.entries(currentQuestion.options).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleOptionClick(key)}
          disabled={selectedOption !== null}
          style={{
            display: "block",
            margin: "8px 0",
            backgroundColor:
              selectedOption === key
                ? key === currentQuestion.correctAnswer
                  ? "lightgreen"
                  : "salmon"
                : ""
          }}
        >
          {key}: {value}
        </button>
      ))}

      {selectedOption && (
        <button onClick={handleNext} style={{ marginTop: "15px" }}>
          Next Question →
        </button>
      )}
    </div>
  );
}
