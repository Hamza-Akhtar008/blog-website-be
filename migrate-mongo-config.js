require("dotenv").config();

module.exports = {
  mongodb: {
    url: process.env.MONGO_URI, // Ensure this is in .env file
    databaseName: "Blog", // Replace with your actual DB name
   
  },
  migrationsDir: "migrations", // Ensure this folder exists
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
};
