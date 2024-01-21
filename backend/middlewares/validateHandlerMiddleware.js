import {check, validationResult} from 'express-validator';

export const validateSignUp = [
   check('username').trim().not().isEmpty().withMessage('Please enter your first and last name!'),
   check('email').normalizeEmail().isEmail().withMessage('Valid email is required!'),
   check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password is required!')
      .isLength({min: 8})
      .withMessage('Password must have between 8 to 32 characters!')
];

export const validateSignIn = [
   check('email').normalizeEmail().isEmail().withMessage('Email is invalid!'),
   check('password').trim().not().isEmpty().withMessage('Password is required!')
];

export const validatePassword = [
   check('newPassword')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password is required!')
      .isLength({min: 8})
      .withMessage('Password must have between 8 to 32 characters!')
];

export const executeValidator = (req, res, next) => {
   const error = validationResult(req).array();
   if (error.length) {
      return res.json({error: error[0].msg});
   }

   next();
}