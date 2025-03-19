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
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Supabase Auth Error:" + error);
      return res.status(400).json({ error: error.message });
    }

    // Ensure user was created before inserting into the 'users' table
    if (!data.user) {
      return res.status(500).json({ error: "User signup failed" });
    }

    // Insert the user with the hashed password
    const { error: userError } = await supabase
      .from('users') // Assuming your table is named 'users'
      .insert([{ id: data.user.id, 
                username: username,
                email: email,
                }]);

    if (userError) {
      return res.status(500).json({ error: userError.message });
    }

    res.status(201).json({ message: "User created successfully", user: data.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Login successful', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

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
  const { username, password, image } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extract JWT token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authData.user || authData.user.id !== id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userId = authData.user.id; // Get logged-in user's ID

    let updatedFields = { username, password };

    if (!username && !password) {
      return res.status(400).json({ error: 'At least one field (username or password) is required to update' });
    }

    // Hash the new password if provided
    if (password) {
      updatedFields.password = await bcrypt.hash(password, saltRounds);
    }

    let imageUrl = null;
    if (image) {
      // Convert base64 to buffer (if image is sent as base64)
      const buffer = Buffer.from(image.split(",")[1], "base64");

      // Upload image to Supabase Storage
      const filePath = `profile-picture/${user.id}-${Date.now()}.png`; // Unique filename
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from("blog-images") // Your storage bucket name
        .upload(filePath, buffer, {
          contentType: "image/png",
        });

      if (uploadError) {
        return res.status(500).json({ error: "Image upload failed", details: uploadError.message });
      }

      //Get public URL of uploaded image
      imageUrl = supabase.storage.from("blog-images").getPublicUrl(filePath).data.publicUrl;
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
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};