const express = require("express");
const router = express.Router({mergeParams: true});

const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog} = require("../controllers/blogController");

router.route("/")
    .get(getBlogs)
    .post(createBlog);

router.route("/:id")
    .get(getBlog)
    .put(updateBlog)
    .delete(deleteBlog);

module.exports = router;

    