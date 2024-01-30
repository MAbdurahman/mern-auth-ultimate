
import {isValidObjectId} from 'mongoose';
import PasswordResetToken from '../models/passwordResetTokenModel.js';
import {errorMessageHandler} from '../utils/errorMessageUtils.js';

export const validatePasswordResetToken = async (req, res, next) => {
   const { token, userId } = req.body;

   if (!token || !isValidObjectId(userId)) {
      return errorMessageHandler(res, 'Invalid request!', 400);
   }
   const resetToken = await PasswordResetToken.findOne({ owner: userId });
   if (!resetToken) {
      return errorMessageHandler(res, 'Unauthorized access!', 400);
   }
   const matched = await resetToken.compareToken(token);
   if (!matched) {
      return errorMessageHandler(res, 'Unauthorized access!', 400);
   }

   req.resetToken = resetToken;
   next();
};