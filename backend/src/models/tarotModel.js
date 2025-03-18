//10-Days-Project\backend\src\models\tarotModel.js

const tarotCards = require('../tarotCards'); // Import tarot cards data
const supabase = require('../config/db');  // Import Supabase client
const { getRandomIndex } = require('../utils/randomUtil');  // Import the random index function

async function getRandomCard(userId) {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);

    // Check if the user has already received a card today
    const { data: tarot_transactions, error } = await supabase
      .from('tarot_transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('random_at', today);

    if (error) {
      console.error(error);
      throw new Error('Error fetching tarot transactions.');
    }

    if (tarot_transactions.length > 0) {
      // User has already received a card today
      return { error: "You have already received your tarot card for today." };
    }

    // Generate a random tarot card from the tarotCards object
    const cardNames = Object.keys(tarotCards);  // Get all card names (keys of the tarotCards object)
    const randomIndex = getRandomIndex(cardNames.length);  // Use the utility to get a random index
    const randomCardName = cardNames[randomIndex];  // Get the card name at that index
    const cardDescription = tarotCards[randomCardName];  // Get the card description from tarotCards

    // Insert the new card transaction into the tarot_transactions table
    const { data, insertError } = await supabase
      .from('tarot_transactions')
      .insert([
        { user_id: userId, card_name: randomCardName, random_at: today }
      ]);

    if (insertError) {
      console.error(insertError);
      throw new Error('Error inserting tarot transaction.');
    }

    // Return the random card details
    return { name: randomCardName, description: cardDescription };
  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while fetching the card.');
  }
}

module.exports = {
  getRandomCard,
};