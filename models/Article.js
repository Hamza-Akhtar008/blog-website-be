const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, default: null },
  description: { type: String, default: null },
  trend: { type: mongoose.Schema.Types.ObjectId, ref: "Trend", required: true }, // Link to Trend
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", ArticleSchema);
