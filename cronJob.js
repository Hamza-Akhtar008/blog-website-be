
const { fetchAndStoreTrends } = require("./services/googleTrendsService");

cron.schedule("0 */6 * * *", async () => {
  console.log("⏳ Running fetchTrendingNews...");
  await fetchTrendingNews();
  console.log("✅ fetchTrendingNews completed.");
});
