import express from 'express'
import { protect } from '../middleware/auth.js'
const router = express.Router();

// import controller
import { 
    createCampaign,
    getCampaigns,
    campaignsBySearch,
    campaignById,
    deleteCampaign,
    cloneCampaign,
    countCampaignsPerMonth
} from '../controllers/campaign.js';

// import validators
import {
    campaignCreationValidator,
} from '../validators/campaign.js';
import { runValidation } from '../validators/index.js';

router.route('/').post(protect, campaignCreationValidator, runValidation, createCampaign)
router.route('/clone').post(protect, cloneCampaign)
router.route('/:id').get(protect, campaignById)
router.route('/').get(protect, getCampaigns)
router.route('/get/search').get(protect, campaignsBySearch)
router.route('/get/per-month').get(protect, countCampaignsPerMonth)
router.route('/').delete(protect, deleteCampaign)

export default router