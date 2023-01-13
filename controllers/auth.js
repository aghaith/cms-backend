import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// @desc    Auth user & get token
// @route   POST /api/v1/auth/signin
// @access  Public
const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec((err, user) => {
        // authenticate
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                // generate a token and send to client
                const token = jwt.sign(
                    { userId: user.id }, 
                    process.env.JWT_SECRET, 
                    { expiresIn: '7d' }
                );
                // persist the token as 'tkn' in cookie with expiry date
                res.cookie('tkn', token, {
                    expire: '1h'
                });
                const { _id, fullname, email } = user;
                return res.json({
                    token,
                    user: {
                        _id,
                        fullname,
                        email,
                    }
                });
            } else {
                res.status(400).json({
                    error: 'Email and password do not match'
                });
            }
        } else if (!user) {
            res.status(404).json({
                error: 'User with that email does not exist. Please signup'
            });
        } else {
            res.status(500).json({
                error: err
            });
        }
    });
});

// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
    const { 
        fullname,
        email,
        gender,
        country,
        company,
        password
    } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({
            error: 'User already exists'
        });
    } else {
        const user = new User({
            fullname: fullname,
            email: email,
            gender: gender,
            country: country,
            company: company,
            password: bcrypt.hashSync(password, 10),
        });
        const registeredUser = await user.save()
        if (registeredUser) {
            res.status(201).json({
                data: {
                    message: 'User successfully registered'
                }
            });
        } else {
            res.status(500).json({
                error: 'User registration failed'
            });
        }
    }
});

// @desc    User Logout
// @route   GET /api/v1/auth/signout
// @access  Private
const signout = asyncHandler(async (req, res) => {
    res.clearCookie('tkn')
    res.status(201).json({
        data: {
            message: 'Signout success'
        }
    });
});

export {
    signup,
    signin,
    signout
}
