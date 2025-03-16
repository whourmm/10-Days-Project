require('dotenv').config(); // Load environment variables from .env file
const { Client } = require('pg');

// Create a new PostgreSQL client
const client = new Client({
  host: process.env.POSTGRES_HOST, // e.g., localhost
  port: process.env.POSTGRES_PORT, // default is 5432
  user: process.env.POSTGRES_USER, // e.g., root
  password: process.env.POSTGRES_PASSWORD, // e.g., root
  database: process.env.POSTGRES_DB, // e.g., intaniatarotdb
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to the database', err.stack);
  });

module.exports = client;