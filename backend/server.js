// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const supabase = require("./src/config/db");

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

// Sample API query
async function getBlogs() {
  try {
    let { data: users, error } = await supabase
    .from('users')
    .select('*')
    return users
  } catch (error) {
    console.log(error)
  }
}

getBlogs().then((blogs) => {console.log(blogs)})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
