const express = require('express');
const router = express.Router();

const {getAllPosts, createBlog, getBlogPost, updateBlogPost, deleteBlogPost} = require('../controllers/blogs');

router.route('/').get(getAllPosts).post(createBlog)
router.route('/:id').get(getBlogPost).patch(updateBlogPost).delete(deleteBlogPost)

module.exports = router