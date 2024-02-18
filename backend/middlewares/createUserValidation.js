import {body} from "express-validator"


export const createUserValidation = [
    body('username')
        .notEmpty().withMessage('This field is required')
        .isLength({min: 4, max: 16}).withMessage('Username must be 4-16 characters long'),
    body('password')
        .notEmpty().withMessage('This field is required')
        .isLength({min: 6, max: 24}).withMessage('Password must be 6-24 characters long'),
];