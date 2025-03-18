const bcrypt = require('bcrypt');
const supabase = require('../config/db');
const { getUserById } = require('./userModel');

// CREATE Blog
const createBlog = async (title, content, tags, user_id) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert({title: title, content: content, tags: tags, user_id: user_id, tags: tags})
      .select()
      .single()

      if (error) {
        throw new Error(error)
      }
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

// READ (One) Blog
const getBlog = (params) => {
  try {

  } catch (err) {
    
  }
}

// READ (Many) Blog
const getBlogs = (params) => {
  try {

  } catch (err) {
    
  }
}

// UPDATE Blog
const updateBlog = (params) => {
  try {

  } catch (err) {
    
  }
}

// DELETE Blog
const deleteBlog = (params) => {
  try {

  } catch (err) {
    
  }
}

module.exports = {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog
}