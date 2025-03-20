// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const supabase = require("./src/config/db");
const userRoutes = require('./src/routes/userRoutes');
const tarotRoutes = require('./src/routes/tarotRoutes');
const blogRoutes = require("./src/routes/blogRoutes");
const commentRoutes = require('./src/routes/commentRoutes')

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use('/api/users', userRoutes);
app.use('/api/comments',commentRoutes);

app.use('/tarot', tarotRoutes);
// Sample API query


app.use("/api/blogs", blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
