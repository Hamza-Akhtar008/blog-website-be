require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Import the MongoDB connection function


const articleRoutes = require("./routes/articleroutes");
const categoryRoutes = require("./routes/categoryRoutes");
const trendroutes = require("./routes/trendRoutes");
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();
app.use("/api", articleRoutes); // Use article routes
app.use("/api/categories", categoryRoutes);
app.use("/api/trending", trendroutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
