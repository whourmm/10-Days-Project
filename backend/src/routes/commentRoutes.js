//10-Days-Project\backend\src\routes\commentRoutes.js
const express = require('express');
const { createComment, getCommentsByBlogId, deleteComment } = require('../controllers/commentController.js');

const router = express.Router();

// POST request to create a comment
router.post('/', createComment);

// GET request to fetch comments by blog_id
router.get('/:blog_id', getCommentsByBlogId);

// DELETE request to delete a comment by comment_id
router.delete('/:comment_id', deleteComment);

module.exports = router;