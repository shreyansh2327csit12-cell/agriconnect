import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  if (!config.mongoString) {
    console.error(
      "MONGO_STRING is missing. Create backend/.env (copy .env.example) and set MONGO_STRING."
    );
    process.exit(1);
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error connecting to Mongoose", err);
  });

  try {
    await mongoose.connect(config.mongoString, {
      serverSelectionTimeoutMS: 10000,
    });
  } catch (error) {
    console.error("MongoDB connection FAILED:", error.message);
    if (/querySrv|ENOTFOUND|ECONNREFUSED/i.test(error.message)) {
      console.error(
        "Hint: DNS/SRV lookup failed. Try DNS 8.8.8.8, another network/hotspot, or the non-SRV connection string."
      );
    } else if (/bad auth|Authentication failed/i.test(error.message)) {
      console.error("Hint: wrong username/password in MONGO_STRING (no < > brackets).");
    } else if (/timed out|selection/i.test(error.message)) {
      console.error("Hint: check Atlas Network Access allows 0.0.0.0/0 and is Active.");
    }
    process.exit(1);
  }
};

export default connectDB;
