const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

// CREATE Blog
const createBlog = async (req, res) => {
  try {
    const { title, content, tags, userId } = req.body
    console.log(
      title, content, tags, userId
    );

    if (!title || !content || !tags || !userId) {
      return res.status(400).json({
        error: "Missing required fields."
      });
    }

    // HOW TO VALIDATE TAG??

    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found."});
    }

    const blog = await blogModel.createBlog(title, content, tags, userId)
    if (!blog) {
      return res.status(400)
    }
    res.status(201).json({ data: blog })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err })
  }
}

// READ (One) Blog
const getBlog = async (req, res) => {
  try {

    res.status(200).json({"data": "getBlog"})
  } catch (err) {
    console.error(err);
    res.status(500).json({"error": err})
  }
}

// READ (Many) Blog
const getBlogs = async (req, res) => {
  try {

    res.status(200).json({"data": "getBlogs"})
  } catch (err) {
    console.error(err);
    res.status(500).json({"error": err})
  }
}

// UPDATE Blog
const updateBlog = async (req, res) => {
  try {

    res.status(200).json({"data": "updateBlog"})
  } catch (err) {
    console.error(err);
    res.status(500).json({"error": err})
  }
}

// DELETE Blog
const deleteBlog = async (req, res) => {
  try {

    res.status(204).json({"data": "deleteBlog"})
  } catch (err) {
    console.error(err);
    res.status(500).json({"error": err})
  }
}

module.exports = {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog
}