const axios = require('axios');
require('dotenv').config();

const getAllImages = async(req, res) => {
    try {
        const url = "https://pixabay.com/api/?key="+process.env.PIXABAY_KEY+"&q=&image_type=photo&pretty=true&safesearch=true";
        await axios.get(url).then((data) => {
            res.status(200).json(data.data);
        }).catch(err => res.status(500).json({"mes": err.message}))
    } catch (error) {
        res.status(500).json({'mes': error.message})
    }
};

const getQueryImages = async(req, res) => {
    try {
        const url = "https://pixabay.com/api/?key="+process.env.PIXABAY_KEY+"&q="+req.params.search+"&image_type=photo&pretty=true&safesearch=true";
        await axios.get(url).then((data) => {
            res.status(200).json(data.data);
        }).catch(err => res.status(500).json({"mes": err.message}))
    } catch (error) {
        res.status(500).json({'mes': error.message})
    }
};

module.exports = {getAllImages, getQueryImages};