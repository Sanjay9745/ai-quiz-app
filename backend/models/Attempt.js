const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },
  answers: Array,
  score: Number,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model("Attempt", attemptSchema);
