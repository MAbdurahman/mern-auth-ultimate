
import ErrorHandler from './errorHandler.js';

export function validateEmail(email) {
   const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;
   let isEmailValidate = false;

   if (email.length === 0) {
      /*return next(new ErrorHandler('Your email is required!', 400));*/
      throw new ErrorHandler('Your email is required!', 400);
   }
   if (!email.match(email_pattern)) {
      /*return next(new ErrorHandler('Enter a valid email!', 400));*/
      throw new ErrorHandler('Enter a valid email', 400);
   }
   isEmailValidate = true;
   return isEmailValidate;

}

export function validateName(name) {
   const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/;
   let isNameValid = false;

   if (name.length === 0) {
      /*return next(new ErrorHandler('Your first and last name are required!', 400));*/
      throw new ErrorHandler('Your first and last name are required!', 400);
   }
   if (!name.match(name_pattern)) {
      /*return next(new ErrorHandler('Enter your first and last name!', 400));*/
      throw new ErrorHandler('Enter your first and last name!', 400);
   }
   isNameValid = true;
   return isNameValid;

}

export function validatePassword(password) {
   const password_pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*?]).{8,}$/i;
   const lowercase_pattern = /^(?=.*[a-z])/g;
   const uppercase_pattern = /^(?=.*[A-Z])/g;
   const digit_pattern = /^(?=.*\d{1,})/g;
   const special_pattern = /(?=.*[-+_!@#$%^&*?])/g;

   let isPasswordValid = false;

   if (password.length === 0) {
      /*return next(new ErrorHandler('A password is required!', 400));*/
      throw new ErrorHandler('A password is required!', 400);
   }
   if (!password.match(lowercase_pattern)) {
      /*return next(new ErrorHandler('Password must have at least one lowercase character!', 400));*/
      throw new ErrorHandler('Password must have at least one lowercase character!', 400);
   }
   if (!password.match(uppercase_pattern)) {
      /*return next(new ErrorHandler('Password must have at least one uppercase character!', 400));*/
      throw new ErrorHandler('Password must have at least one uppercase character!', 400);
   }
   if (!password.match(digit_pattern)) {
      /*return next(new ErrorHandler('Password must have at least one number character!', 400));*/
      throw new ErrorHandler('Password must have at least one number character!', 400);
   }
   if (!password.match(special_pattern)) {
      /*return next(new ErrorHandler(`Password must include at least one: '-+_!@#$%^&*?'`, 400));*/
      throw new ErrorHandler(`Password must include at least one: '-+_!@#$%^&*?'`, 400);
   }
   if (!password.match(password_pattern)) {
      /*return next(new ErrorHandler('Password must have at least 8 characters!', 400));*/
      throw new ErrorHandler('Password must have at least 8 characters!', 400);
   }
   isPasswordValid = true;
   return isPasswordValid;

}