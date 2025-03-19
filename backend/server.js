// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const supabase = require("./src/config/db");

// Import routes
const blogs = require("./src/routes/blogs");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/blogs", blogs);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
