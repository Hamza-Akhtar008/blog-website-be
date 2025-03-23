const express = require("express");
const router = express.Router();
const { getAllArticles } = require("../controllers/articlecontroller");

// Route to fetch all articles
router.get("/articles", getAllArticles);

module.exports = router;
