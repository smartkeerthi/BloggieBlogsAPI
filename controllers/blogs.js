const blogSchema = require('../models/Blogs');

const getAllPosts = async(req, res) => {
    try {
        const allPost = await blogSchema.find({}).sort({createdAt: -1});
        res.status(200).json(allPost);
    } catch (error) {
        res.status(500).json({'mes':error.message});
    }
};

const createBlog = async(req, res) => {
    const createPost = blogSchema(req.body);
    try {
        const createdPost = await createPost.save();
        res.status(200).json(createdPost);
    } catch (error) {
        res.status(500).json({'mes':error.message});
    }
};

const getBlogPost = async(req, res) => {
    try {
        const getPost = await blogSchema.findOne({_id : req.params.id});
        res.status(200).json(getPost);
    } catch (error) {
        res.status(500).json({'mes':error.message});
    }
};

const updateBlogPost = async(req, res) => {
    try {
        const updatePost = await blogSchema.findByIdAndUpdate({_id:req.params.id},req.body,{new: true, runValidators: true});
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(500).json({'mes':error.message});
    }
};

const deleteBlogPost = async(req, res) => {
    try {
        const deletePost = await blogSchema.deleteOne({_id : req.params.id});
        res.status(200).json(deletePost);
    } catch (error) {
        res.status(500).json({'mes':error.message});
    }
};

const getAuthorPost = async(req, res) => {
    try {
        const authorPost = await blogSchema.find({author: req.params.author}).sort({createdAt: -1});
        res.status(200).json(authorPost);
    } catch (error) {
        res.status(500).json({'mes':error.message});
    }
};

module.exports = {getAllPosts, createBlog, getBlogPost, updateBlogPost, deleteBlogPost, getAuthorPost}