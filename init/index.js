const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.model.js");

const Mongo_url = "mongodb://127.0.0.1:27017/HomeyFi";

main()
   .then(() => {
      console.log("Successfully Connected to MongoDB");
   })
   .catch((err) => {
      console.log("Connection error:", err);
   });

async function main() {
   await mongoose.connect(Mongo_url);
}

const initDB = async () => {
   try {
      // Clear existing documents
      await Listing.deleteMany({});
      console.log("All listings removed.");

      // Update owner ID dynamically
      initData.data = initData.data.map((obj) => ({
         ...obj,
         owner: "6782495966f7c1c68ff66e00", 
      }));

      // Insert new data
      await Listing.insertMany(initData.data);
      console.log("New data inserted.");

      // Verify insertion
      //const count = await Listing.countDocuments();
      //console.log(`Current number of listings: ${count}`);
   } catch (err) {
      console.error("Error during initialization:", err);
   }
};

initDB();
