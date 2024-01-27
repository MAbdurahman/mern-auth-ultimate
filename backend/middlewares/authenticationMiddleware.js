
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import User from '../models/userModel.js';

export const authenticateUser = async (req, res, next) => {
   const token = req.headers?.authorization;
   const jwtToken = token.split("Bearer ")[1];

   if (!jwtToken) {
      return next(new ErrorHandler('Invalid token', 401));
   }
   const decode = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
   const { userId } = decode;
   const user = await User.findById(userId);

   if (!user) {
      return next(new ErrorHandler('Forbidden access', 404))
   }

   req.user = user;
   next();

};