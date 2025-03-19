const { User } = require('../models/userModel');  // Import the updated model
const supabase = require('../config/db'); // Import the supabase client
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const saltRounds = 10;

// Create a new user
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user with the hashed password
    const { data, error } = await supabase
      .from('users') // Assuming your table is named 'users'
      .insert([{ username, email, password: hashedPassword }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'User created successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id)
      .single(); // Fetch a single record

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  if (!username && !email && !password) {
    return res.status(400).json({ error: 'At least one field (username, email, or password) is required to update' });
  }

  try {
    let updatedFields = { username, email };

    // Hash the new password if provided
    if (password) {
      updatedFields.password = await bcrypt.hash(password, saltRounds);
    }

    // Update the user with the provided fields
    const { data, error } = await supabase
      .from('users')
      .update(updatedFields)
      .eq('id', id)
      .single(); // Update a single record

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'User updated successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .single(); // Delete a single record

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'User deleted successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};