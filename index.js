import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // Import CORS
import bookRoute from "./route/Book.route.js";
import userRoute from "./route/user.route.js";

// Initialize Express app
const app = express();
dotenv.config(); // Load environment variables

// Use CORS middleware
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend
}));

app.use(express.json()); // Parse JSON data

// Set up the PORT and MongoDB connection string from environment variables
const PORT = process.env.PORT || 4000;
const url = process.env.MongoDbUrl;

// Check if MongoDbUrl exists in the environment variables
if (!url) {
  console.error("MongoDbUrl is not defined in the environment variables.");
  process.exit(1); // Exit if no URL is provided
}

// Connecting to MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Connect Routes
app.use("/Book", bookRoute);
app.use("/Users", userRoute);
