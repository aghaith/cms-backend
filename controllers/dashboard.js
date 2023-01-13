import asyncHandler from 'express-async-handler';
import Contact from '../models/contact.js';
import User from '../models/user.js';
import Campaign from '../models/campaign.js';

// @desc    Dashboard Overview
// @route   GET /api/v1/dashboard/get/count
// @access  Private
const dashboardOverview = asyncHandler(async (req, res) => {
    const contactCount = await Contact.countDocuments();
    const userCount = await User.countDocuments();
    const campaignCount = await Campaign.countDocuments();

    let dashData = [
        { 
            value : contactCount,
            key: 'contacts'
        },
        { 
            value : userCount,
            key: 'users'
        },
        { 
            value : campaignCount,
            key: 'campaigns'
        }
    ]

    if (!dashData) {
        res.status(404).json({
            data: {
                message: 'No data found'
            }
        })
        res.status(500).json({
            data: {
                message: 'Server error'
            }
        })
    }
    res.status(200).json(dashData)
})

export {
    dashboardOverview
}
