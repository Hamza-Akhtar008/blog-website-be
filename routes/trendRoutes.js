const express = require("express");
const { getTrends } = require("../controllers/trendController");

const router = express.Router();

// Route to get trends
router.get("/alltrend", getTrends);

module.exports = router;
