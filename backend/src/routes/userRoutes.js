//10-Days-Project\backend\src\routes\userRoutes.js
const express = require('express');
const { createUser, loginUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController'); // Import controller
const router = express.Router({ mergeParams: true });

router.post('/', createUser);

router.post('/login', loginUser);

// Get all users
router.get('/', getUsers);

// READ User by ID
router.get('/:id', getUserById);

// UPDATE User
router.put('/:id', updateUser);

// DELETE User
router.delete('/:id', deleteUser);

module.exports = router;