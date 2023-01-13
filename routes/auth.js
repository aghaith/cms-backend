import express from 'express'
import { protect } from '../middleware/auth.js'
const router = express.Router();

// import controller
import { 
    signin,
    signup,
    signout
} from '../controllers/auth.js';

// import validators
import {
    userSignupValidator,
    userSigninValidator,
} from '../validators/user.js';
import { runValidation } from '../validators/index.js';

router.route('/signin').post(userSigninValidator, runValidation, signin)
router.route('/signup').post(userSignupValidator, runValidation, signup)
router.route('/signout').get(protect, signout)

export default router