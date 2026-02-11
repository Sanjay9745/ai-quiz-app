const Attempt = require("../models/Attempt");

exports.getLeaderboard = async (req, res) => {  
    const leaderboard = await Attempt.aggregate([
        {
            $group: {
        _id: "$student",
        totalScore: { $sum: "$score" }
      }
    },
    { $sort: { totalScore: -1 } },
    { $limit: 10 }
  ]);

  res.json(leaderboard);
};