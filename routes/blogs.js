const express = require('express');
const router = express.Router();

const {getAllPosts, createBlog, getBlogPost, updateBlogPost, deleteBlogPost, getAuthorPost} = require('../controllers/blogs');

router.route('/').get(getAllPosts).post(createBlog)
router.route('/:id').get(getBlogPost).patch(updateBlogPost).delete(deleteBlogPost)
router.route('/getAuthor/:author').get(getAuthorPost)

module.exports = router