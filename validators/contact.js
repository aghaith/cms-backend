import { check } from 'express-validator';

const contactCreationValidator = [
    check('name', 'Name is required')
        .notEmpty(),
];

export {
    contactCreationValidator,
}