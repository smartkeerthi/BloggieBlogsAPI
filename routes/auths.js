const express = require('express');
const router = express.Router();

const { registerUser, loginUser, verifyUser } = require('../controllers/auths');


router.get('/', verifyUser, (req, res) => {
    res.status(200).json({'auth': true, "mes": "user is verified"});
})
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

module.exports = router