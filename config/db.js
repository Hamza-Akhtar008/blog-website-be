const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {

    await mongoose.connect(process.env.MONGO_URI, {
     
      
    }).then(()=>
    {
      console.log("✅ MongoDB Connected Successfully");
    }).catch((error)=>
    {
      console.error("❌ MongoDB Connection Error:", error.message);
    });
   
 
};

module.exports = connectDB;
