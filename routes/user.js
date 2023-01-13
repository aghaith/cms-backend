import express from 'express'
import { protect } from '../middleware/auth.js'
const router = express.Router();

// import controller
import { 
    getUserProfile,
    countUsersPerMonth
} from '../controllers/user.js';

router.route('/:id').get(protect, getUserProfile)
router.route('/get/per-month').get(protect, countUsersPerMonth)

export default router