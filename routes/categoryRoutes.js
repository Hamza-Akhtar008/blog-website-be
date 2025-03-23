const express = require("express");
const { getAllCategories } = require("../controllers/categorycontroller")

const router = express.Router();

// Route: GET /api/categories
router.get("/all-categories", getAllCategories);

module.exports = router;
