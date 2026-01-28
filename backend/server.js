const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Route to get quiz questions from AI
app.post("/api/quiz", async (req, res) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [
              {
                text: "Generate 5 multiple choice quiz questions on JavaScript arrays. Return ONLY valid JSON in this format: { \"questions\": [ { \"question\": \"\", \"options\": { \"A\": \"\", \"B\": \"\", \"C\": \"\", \"D\": \"\" }, \"correctAnswer\": \"A/B/C/D\" } ] }"
              }
            ]
          }
        ]
      }
    );

    const aiText = response.data.candidates[0].content.parts[0].text;

    res.json(JSON.parse(aiText)); // Send JSON to frontend
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
