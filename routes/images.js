const express = require('express');
const router = express.Router();

const {getAllImages, getQueryImages} = require('../controllers/images');

router.route('/').get(getAllImages)
router.route('/:search').get(getQueryImages)

module.exports = router