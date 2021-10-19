const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Title is required']
    },
    image : {
        type : String,
        required : [true, 'Image url is required']
    },
    description : {
        type : String,
        required : [true, 'Description is required']
    },
    content : {
        type : String,
        required : [true, 'Blog content is required']
    },
    author : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);