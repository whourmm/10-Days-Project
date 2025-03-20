require('dotenv').config(); // Load environment variables from .env file

const { createClient } = require('@supabase/supabase-js');

// Get Supabase URL and Key from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
