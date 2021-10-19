const userSchema = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async(req, res) => {
    try {
        const {fullName, email, password} = req.body;
        const isUser = await userSchema.findOne({email});
        if(isUser){
            return res.status(409).json({'auth': false, 'mes':'user already exists'});
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await userSchema.create({
            fullName,
            email: email.toLowerCase(),
            password: encryptedPassword
        });
        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY
        );

        res.status(200).json({'auth': true, 'mes': 'success','token': token, user});
    } catch (error) {
        return res.status(500).json({'auth': false, 'mes':error.message});
    }
};

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY
            );

            res.status(200).json({'auth': true, 'mes': 'success','token': token, user});
        }else{
            res.status(400).json({'auth': false, 'mes': 'Invalid credentials'});
        }
    } catch (error) {
        res.status(500).json({'auth': false, 'mes':error.message});
    }
};

const verifyUser = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(token){
        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if(err){
                res.status(400).json({'auth': false, 'mes': 'Login again'});
            }else{
                req.user_id = decoded.id;
                next();
            }
        });
    }
};


module.exports = {registerUser, loginUser, verifyUser}