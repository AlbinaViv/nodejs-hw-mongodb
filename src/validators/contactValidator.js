import { body } from 'express-validator';

export const createContactValidationSchema = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name should be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Name should be between 3 and 20 characters'),
  body('phoneNumber')
    .optional()
    .isString()
    .withMessage('Phone number should be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Phone number should be between 3 and 20 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email should be a valid email address'),
  body('isFavourite')
    .optional()
    .isBoolean()
    .withMessage('isFavourite should be a boolean'),
  body('contactType')
    .optional()
    .isString()
    .withMessage('Contact type should be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Contact type should be between 3 and 20 characters'),
];

export const updateContactValidationSchema = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name should be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Name should be between 3 and 20 characters'),
  body('phoneNumber')
    .optional()
    .isString()
    .withMessage('Phone number should be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Phone number should be between 3 and 20 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email should be a valid email address'),
  body('isFavourite')
    .optional()
    .isBoolean()
    .withMessage('isFavourite should be a boolean'),
  body('contactType')
    .optional()
    .isString()
    .withMessage('Contact type should be a string')
    .isLength({ min: 3, max: 20 })
    .withMessage('Contact type should be between 3 and 20 characters'),
];
