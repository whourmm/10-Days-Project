const userModel = require('../models/userModel');  // Import the updated model

// CREATE User
const createUser = async (req, res) => {
      const { username, email, password } = req.body;
      try {
        const newUser = await userModel.createUser(username, email, password);
        res.status(201).json(newUser);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
};
    
// READ all Users
const getUsers = async (req, res) => {
      try {
        const users = await userModel.getUsers();
        res.status(200).json(users);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
};
    
// READ User by ID
const getUserById = async (req, res) => {
      const { id } = req.params;
      try {
        const user = await userModel.getUserById(id);
        if (!user) {
          return res.status(404).send('User not found');
        }
        res.status(200).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
};
    
// UPDATE User
const updateUser = async (req, res) => {
      const { id } = req.params;
      const { username, email, password } = req.body;
      try {
        const updatedUser = await userModel.updateUser(id, username, email, password);
        if (!updatedUser) {
          return res.status(404).send('User not found');
        }
        res.status(200).json(updatedUser);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
};
    
// DELETE User
const deleteUser = async (req, res) => {
      const { id } = req.params;
      try {
        const deletedUser = await userModel.deleteUser(id);
        if (!deletedUser) {
          return res.status(404).send('User not found');
        }
        res.status(200).json({ message: 'User deleted' });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
};
    
module.exports = {
      createUser,
      getUsers,
      getUserById,
      updateUser,
      deleteUser,
};