//10-Days-Project\backend\src\routes\userRoutes.js
const express = require('express');
const userController = require('../controllers/userController'); // Import controller
const router = express.Router({ mergeParams: true });

// CREATE User
router.post('/', userController.createUser);

// READ all Users
router.get('/', userController.getUsers);

// READ User by ID
router.get('/:id', userController.getUserById);

// UPDATE User
router.put('/:id', userController.updateUser);

// DELETE User
router.delete('/:id', userController.deleteUser);

module.exports = router;