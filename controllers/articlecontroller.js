const Article = require("../models/Article");
const Trend = require("../models/Trend");

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("trend", "keyword");

    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

module.exports = { getAllArticles };
