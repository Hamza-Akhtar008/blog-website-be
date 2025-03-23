const axios = require("axios");
const Category = require("../models/Category");
const Trend = require("../models/Trend");
const Article = require("../models/Article");

const GOOGLE_API_KEY = "AIzaSyD7NKaSovT1AAPMXXuPlGIzGAZ3vz1_rYA";
const SEARCH_ENGINE_ID = "a143be989a3cc42b0";
const MAX_RETRIES = 3; // Maximum retries for Google API requests

const fetchGoogleResults = async (query, retries = 0) => {
  const GOOGLE_SEARCH_URL = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&num=10`;

  try {
    const response = await axios.get(GOOGLE_SEARCH_URL);
    return response.data.items; // Return fetched articles
  } catch (error) {
    console.error(`❌ Google API failed for: ${query}. Attempt ${retries + 1} of ${MAX_RETRIES}.`);

    if (retries < MAX_RETRIES) {
      console.log("⏳ Retrying after 2 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
      return fetchGoogleResults(query, retries + 1);
    } else {
      console.error(`❌ Google API failed permanently for: ${query}. Skipping.`);
      return null;
    }
  }
};

const fetchTrendingNews = async () => {
  try {
    console.log("🔄 Fetching trending news...");

    // NewsData API
    const NEWS_API_KEY = "pub_756658560f9c527430bcd0641a122e032a18a";
    const NEWS_API_URL = `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&country=us&language=en`;

    const response = await axios.get(NEWS_API_URL);
    const articles = response.data.results;

   

    for (const article of articles) {
      if (!article.title || !article.category) continue;

      console.log(`🔍 Searching articles for: ${article.title}`);

      // 🔹 Fetch Google Search Results
      const googleResults = await fetchGoogleResults(article.title);

      // ⚠️ If no Google search results, SKIP this trend and category
      if (!googleResults || googleResults.length === 0) {
        console.log(`⚠️ No relevant articles found for: ${article.title}, skipping category & trend.`);
        continue;
      }

      // 🔹 Now, create Category (only if at least one article is found)
      let category = await Category.findOne({ name: article.category[0] });
      if (!category) {
        category = await Category.create({ name: article.category[0] });
      }

      // 🔹 Now, create Trend (only if at least one article is found)
      let trend = await Trend.findOne({ keyword: article.title });
      if (!trend) {
        trend = await Trend.create({ keyword: article.title, category: category._id });
      }

      // 🔹 Save Articles
      for (const result of googleResults) {
        await Article.create({
          title: result.title,
          link: result.link,
          image: result.pagemap?.cse_image?.[0]?.src || null,
          description: result.snippet || null,
          trend: trend._id, // Link to trend
        });
        console.log(`✅ Saved article: ${result.title}`);
      }
    }
  } catch (error) {
    console.error("❌ Error fetching news:", error);
  }
};


module.exports = { fetchTrendingNews };
