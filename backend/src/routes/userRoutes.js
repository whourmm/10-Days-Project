//10-Days-Project\backend\src\routes\userRoutes.js
const express = require('express');
const userController = require('../controllers/userController'); // Import controller
const router = express.Router();

// CREATE User
router.post('/users', userController.createUser);

// READ all Users
router.get('/users', userController.getUsers);

// READ User by ID
router.get('/users/:id', userController.getUserById);

// UPDATE User
router.put('/users/:id', userController.updateUser);

// DELETE User
router.delete('/users/:id', userController.deleteUser);

module.exports = router;