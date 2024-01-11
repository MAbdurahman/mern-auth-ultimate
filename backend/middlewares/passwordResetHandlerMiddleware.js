
import {isValidObjectId} from 'mongoose';
import PasswordResetToken from '../models/passwordResetTokenModel.js';
import ErrorHandler from '../utils/errorHandler.js';

export const validatePasswordResetToken = async (req, res, next) => {
   const { token, userId } = req.body;

   if (!token.trim() || !isValidObjectId(userId)) {
      return next(new ErrorHandler('Invalid request!', 400));
   }
   const resetToken = await PasswordResetToken.findOne({ owner: userId });
   if (!resetToken) {
      return next(new ErrorHandler('Unauthorized access!', 400));
   }
   const matched = await resetToken.compareToken(token);
   if (!matched) {
      return next(new ErrorHandler('Unauthorized access!', 400));
   }

   req.resetToken = resetToken;
   next();
};