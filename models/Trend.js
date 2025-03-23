const mongoose = require("mongoose");

const TrendSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Linking Trend to Category
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trend", TrendSchema);
