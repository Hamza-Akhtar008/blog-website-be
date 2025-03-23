const Category = require("../models/Category");
const Trend = require("../models/Trend");
const Article = require("../models/Article");

/**
 * @desc Get all categories with article count
 * @route GET /api/categories
 * @access Public
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "trends",
          localField: "_id",
          foreignField: "category",
          as: "trends",
        },
      },
      {
        $lookup: {
          from: "articles",
          localField: "trends._id",
          foreignField: "trend",
          as: "articles",
        },
      },
      {
        $addFields: {
          count: { $size: "$articles" }, // Count number of articles
        },
      },
      {
        $project: {
          articles: 0, // Exclude articles array
          trends: 0, // Exclude trends array
        },
      },
      {
        $sort: { name: 1 }, // Sort categories alphabetically
      },
    ]);

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("❌ Error fetching categories with article count:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getAllCategories };
