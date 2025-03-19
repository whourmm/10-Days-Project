//10-Days-Project\backend\src\routes\tarotRoutes.js
const express = require('express');
const router = express.Router();
const tarotController = require('../controllers/tarotController'); // Import the controller

// Define the route for getting a random tarot card
router.get('/random', tarotController.getRandomCard);

module.exports = router;
