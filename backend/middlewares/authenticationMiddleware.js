
import jwt from 'jsonwebtoken';
import {errorMessageHandler} from '../utils/errorMessageUtils.js';
import User from '../models/userModel.js';

export const authenticateUser = async (req, res, next) => {
   const token = req.headers?.authorization;
   const jwtToken = token.split("Bearer ")[1];

   if (!jwtToken) {
      return errorMessageHandler(res, 'Invalid token!', 401);
   }
   const decode = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
   const { userId } = decode;
   const user = await User.findById(userId);

   if (!user) {
      return errorMessageHandler(res, 'Forbidden access - User not found!', 404);
   }

   req.user = user;
   next();

};