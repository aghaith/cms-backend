import asyncHandler from 'express-async-handler';
import { formatKey } from '../middleware/helpers.js';
import User from '../models/user.js';

// @desc    Get user Profile
// @route   GET /api/v1/user/id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        res.json({
            fullname: user.fullname,
            email: user.email,
            gender: user.gender,
            country: user.country,
            company: user.company,
        })
    } else {
        res.status(404).json({
            data: {
                message: 'User not found'
            }
        });
    }
})

// @desc    Users per month
// @route   GET /api/v1/user/get/per-month
// @access  Private
const countUsersPerMonth = asyncHandler(async (req, res, next) => {
    const users = await User.find({}, '_id').exec();
    
    const usersPerMonth = users.reduce((map, { dateRegistered }) => {
        const dates = formatKey(dateRegistered).replace(" ", "-")
        let data = {
            value: (map.get(dates) ?? 0) + 1,
            date: dates,
        }
        return data
    }, new Map())
    
    res.status(200).json([usersPerMonth])
})

export {
    getUserProfile,
    countUsersPerMonth
}
