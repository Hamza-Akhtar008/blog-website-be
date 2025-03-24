const cron = require("node-cron");
const { fetchTrendingNews } = require("./services/googleTrendsService");

cron.schedule("0 */4 * * *", async () => {
  console.log("⏳ Running fetchTrendingNews...");
  await fetchTrendingNews();
  console.log("✅ fetchTrendingNews completed.");
});