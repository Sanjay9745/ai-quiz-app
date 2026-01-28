export async function fetchQuizQuestions() {
  const res = await fetch("http://localhost:5000/api/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  return res.json();
}
