import { check } from 'express-validator';

const userSignupValidator = [
    check('fullname', 'Full name is required')
        .notEmpty(),
    check('email', 'Email is required')
        .notEmpty()
        .isEmail()
        .withMessage('Must be a valid email addess'),
    check('gender', 'Gender is required')
        .notEmpty(),
    check('country', 'Country is required')
        .notEmpty(),
    check('company', 'Company is required')
        .notEmpty(),
    check('password', 'Password is required')
        .notEmpty()
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long')
];

const userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email addess'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
];

export {
    userSignupValidator,
    userSigninValidator,
}