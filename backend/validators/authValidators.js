import {check} from 'express-validator';

export const userSignUpValidator = [
   check('name')
      .not()
      .isEmpty()
      .withMessage('Full name is required!'),
   check('email')
      .isEmail()
      .withMessage('Email must be valid!'),
   check('password')
      .isLength({min: 8})
      .withMessage('Password must be at least 8 characters!')
];