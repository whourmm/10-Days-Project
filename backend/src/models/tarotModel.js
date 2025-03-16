//10-Days-Project\backend\src\models\tarotModel.js

const tarotCards = require('../tarotCards'); // Import tarot cards data
const { getRandomIndex } = require('../utils/randomUtil');  // Import random index function

// In-memory storage for users' last tarot card received info
let users = {}; // This will simulate a simple user storage (can be replaced with a DB later)

// Function to get a random tarot card (only once per day)
function getRandomCard(userId) {
  return new Promise((resolve, reject) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);

    // Check if the user has already received a card today
    if (users[userId] && users[userId].lastReceived === today) {
      // User has already received a card today
      resolve({ error: "You have already received your tarot card for today." });
    } else {
      // Generate a random tarot card
      const cardNames = Object.keys(tarotCards);
      const randomIndex = getRandomIndex(cardNames.length);
      const randomCardName = cardNames[randomIndex];
      const cardDescription = tarotCards[randomCardName];

      // Save the user's last received card and the date
      users[userId] = { lastReceived: today, cardName: randomCardName, cardDescription };

      // Resolve with the random card details
      resolve({ name: randomCardName, description: cardDescription });
      console.log(randomCardName)
    }
  });
}

module.exports = {
  getRandomCard,
};