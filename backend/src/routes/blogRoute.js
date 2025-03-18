const express = require('express');
const router = express.Router({ mergeParams: true });
const blogController = require('../controllers/blogController');

// CREATE Blog
router.post('/', blogController.createBlog);

// READ (One) Blog
router.get('/:id', blogController.getBlog)

// READ (Many) Blog
router.get('/', blogController.getBlogs)

// UPDATE Blog
router.put('/:id', blogController.updateBlog)

// DELETE Blog
router.delete('/id', blogController.deleteBlog)

module.exports = router;
