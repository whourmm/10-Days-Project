//10-Days-Project\backend\src\models\userModel.js
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const supabase = require('../config/db');  // Assuming supabase client is configured here

// CREATE User
const createUser = async (username, email, password) => {
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: hashedPassword,  // Store the hashed password in supabase authentication
      });
    
      if (error) {
        throw new Error('Error signing up user: ' + error.message);
      }
    
      // Insert user profile data into users table with the hashed password
      const { data, insertError } = await supabase
        .from('users')
        .insert([{ id: user.id, username:username, email:email, password: hashedPassword }]);
    
      if (insertError) {
        throw new Error('Error inserting user profile data: ' + insertError.message);
      }
    
      return data[0];  // Return newly created user
};
    
// READ all Users
const getUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*');
    
      if (error) {
        throw new Error('Error fetching users: ' + error.message);
      }
    
      return data;
};
    
// READ a single User by ID
const getUserById = async (id) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
    
      if (error) {
        throw new Error('Error fetching user: ' + error.message);
      }
    
      return data;
};
    
// UPDATE User
 const updateUser = async (id, username, email, password) => {
      // If password is being updated, hash it
      let updatedData = { username, email };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }
    
      const { data, error } = await supabase
        .from('users')
        .update(updatedData)
        .eq('id', id)
        .select();
    
      if (error) {
        throw new Error('Error updating user: ' + error.message);
      }
    
      return data[0];  // Return updated user data
    };
    
// DELETE User
const deleteUser = async (id) => {
      const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
        .select();
    
      if (error) {
        throw new Error('Error deleting user: ' + error.message);
      }
    
      return data[0];  // Return deleted user data
};
    
 // VERIFY Password (for login or authentication)
/*const verifyPassword = async (email, password) => {
      // First, get the user by email
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
    
      if (error || !data) {
        throw new Error('User not found');
      }
    
      // Compare the entered password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, data.password);
    
      if (!isMatch) {
        throw new Error('Incorrect password');
      }
    
      return data;  // Return user data if password is correct
};*/
    
 module.exports = {
      createUser,
      getUsers,
      getUserById,
      updateUser,
      deleteUser,
      //verifyPassword,  // Add the function for password verification
};