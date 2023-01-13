import express from 'express'
import { protect } from '../middleware/auth.js'
const router = express.Router();

// import controller
import { 
    dashboardOverview
} from '../controllers/dashboard.js';

router.route('/get/count').get(protect, dashboardOverview)

export default router