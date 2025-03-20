//10-Days-Project\backend\src\controllers\tarotController.js
const tarotModel = require('../models/tarotModel'); // Import the model with declared attributes
const supabase = require('../config/db');  // Import Supabase client
const { getRandomIndex } = require('../utils/randomUtil');  // Import random index utility

// Controller function to handle getting a random card
async function getRandomCard(req, res) {
  //const userId = req.query.user_id;  // Assuming userId is passed as a query parameter

  const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Validate session with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Fetch user details
    let { data: userData, error: userError } = await supabase
      .from("users")
      .select("username")
      .eq("id", user.id)
      .single();

    if (userError || !userData) {
      return res.status(404).json({ error: "User not found" });
    }

  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);

    // Check if the user has already received a card today
    const { data: tarot_transactions, error } = await supabase
      .from('tarot_transactions')
      .select('*')
      .eq('user_id', user.id)
      .eq('random_at', today);

    if (error) {
      console.error(error);
      throw new Error('Error fetching tarot transactions.');
    }

    if (tarot_transactions.length > 0) {
      // User has already received a card today
      return res.status(403).json({ error: "You have already received your tarot card for today." });
    }
    //console.log("tarot Model:",  tarotModel);  // Debugging log

    // Generate a random tarot card from the tarotCards object
    const cardNames = Object.keys(tarotModel); // Get all card names (keys of the tarotCards object)
    const randomIndex = getRandomIndex(cardNames.length);  // Use the utility to get a random index
    const randomCardName = cardNames[randomIndex];  // Get the card name at that index
    const cardDescription = tarotModel[randomCardName].prediction;; // Get the card description from tarotCards

    // Insert the new card transaction into the tarot_transactions table
    const { data, insertError } = await supabase
      .from('tarot_transactions')
      .insert([
        { user_id: user.id, card_name: randomCardName, random_at: today }
      ]);

    if (insertError) {
      console.error(insertError);
      throw new Error('Error inserting tarot transaction.');
    }

    // Return the random card details
    res.json({ name: randomCardName, description: cardDescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the card.' });
  }
}

// Controller function to get the history of tarot cards for the past week
async function getCardHistory(req, res) {
  //const userId = req.query.user_id;  // Assuming userId is passed as a query parameter

  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Validate session with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Fetch user details
    let { data: userData, error: userError } = await supabase
      .from("users")
      .select("username")
      .eq("id", user.id)
      .single();

    if (userError || !userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the date 7 days ago from today
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const startDate = sevenDaysAgo.toISOString().slice(0, 10); // YYYY-MM-DD format

    // Fetch tarot transactions for the user in the past week
    const { data, error } = await supabase
      .from('tarot_transactions')
      .select('*')
      .eq('user_id', user.id)
      .gte('random_at', startDate) // Filter transactions from 7 days ago to today
      .order('random_at', { ascending: false });  // Order by date, most recent first

    if (error) {
      console.error(error);
      throw new Error('Error fetching tarot transaction history.');
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "No tarot card history found for the past week." });
    }

    // Return the fetched data (historical transactions)
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the card history.' });
  }
}

module.exports = {
  getRandomCard,
  getCardHistory,
};