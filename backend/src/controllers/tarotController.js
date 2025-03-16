//10-Days-Project\backend\src\controllers\tarotController.js
const tarotModel = require('../models/tarotModel'); // Import the model

// Controller function to handle getting a random card
function getRandomCard(req, res) {
  const userId = req.query.userId;  // Assuming userId is passed as a query parameter

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  tarotModel.getRandomCard(userId) // Get card data for the user
    .then(randomCard => {
      if (randomCard.error) {
        return res.status(403).json({ error: randomCard.error });  // User already received their card today
      }

      res.json(randomCard); // Send the card data as JSON response
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the card.' });
    });
}

module.exports = {
  getRandomCard,
};

