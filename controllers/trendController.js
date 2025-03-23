const mongoose = require("mongoose");
const Trend = require("../models/Trend");
const Article = require("../models/Article");

/**
 * @desc    Get latest trends from the database with correct article count
 * @route   GET /api/trends
 * @access  Public
 */
const getTrends = async (req, res) => {
  try {
    const trends = await Trend.aggregate([
      {
        $lookup: {
          from: "articles", // Reference articles collection
          localField: "_id", // Trend's _id field
          foreignField: "trend", // Article's trend field (reference to Trend._id)
          as: "relatedArticles",
        },
      },
      {
        $addFields: {
          articleCount: { $size: "$relatedArticles" }, // Correctly count related articles
        },
      },
      {
        $project: {
          keyword: 1, // Include keyword
          articleCount: 1, // Include article count
        },
      },
      { $sort: { timestamp: -1 } }, // Sort by newest trends
    ]);

    res.json(trends);
  } catch (error) {
    console.error("❌ Error fetching trends:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getTrends };
