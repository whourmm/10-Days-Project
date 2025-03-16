// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./src/config/db");

// Load environment variables
dotenv.config();

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

// Sample db pool connection
async function getBlogs() {
  try {
    const result = await pool.query("SELECT * FROM blogs");
    console.log(result.rows);
  } catch (error) {
    console.error("DB error: " + error.message);
  }
}

getBlogs();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
