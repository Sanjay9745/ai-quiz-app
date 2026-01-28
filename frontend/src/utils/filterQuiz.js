export function filterQuizResponse(data) {
  if (!data.questions || !Array.isArray(data.questions)) return { questions: [] };

  const validQuestions = data.questions.filter(q =>
    q.question &&
    q.options?.A &&
    q.options?.B &&
    q.options?.C &&
    q.options?.D &&
    ["A", "B", "C", "D"].includes(q.correctAnswer)
  );

  return { questions: validQuestions };
}
