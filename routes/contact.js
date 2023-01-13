import express from 'express'
import { protect } from '../middleware/auth.js'
const router = express.Router();

// import controller
import { 
    createContact,
    getContacts
} from '../controllers/contact.js';

// import validators
import {
    contactCreationValidator,
} from '../validators/contact.js';
import { runValidation } from '../validators/index.js';

router.route('/').post(protect, contactCreationValidator, runValidation, createContact)
router.route('/').get(protect, getContacts)

export default router