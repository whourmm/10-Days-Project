const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import routes
const tarotRoutes = require('./src/routes/tarotRoutes'); // Import tarot routes from src/routes

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Use tarot routes
app.use('/tarot', tarotRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});