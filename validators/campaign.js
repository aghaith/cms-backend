import { check } from 'express-validator';

const campaignCreationValidator = [
    check('name', 'Name is required')
        .notEmpty(),
    check('type', 'Type is required')
        .notEmpty(),
    check('accountId', 'Account ID is required')
        .notEmpty()
        .isNumeric()
        .withMessage('Account ID should be a number'),
    check('contacts')
        .isArray({ min: 5 })
        .withMessage('Select at least 5 contacts'),
];

export {
    campaignCreationValidator,
}