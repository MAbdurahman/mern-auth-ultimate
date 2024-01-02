/**
 * backend/controllers/authController.js
 */
import User from '../models/userModel.js';

export const signUp = (req, res) => {
   console.log(req.body)
   res.json({
      data: 'auth/sign-up endpoint'
   })
}

export const signIn = (req, res) => {
   res.json({
      data: 'auth/sign-in endpoint'
   })
}

export const signOut = (req, res) => {
   res.json({
      data: 'auth/sign-out endpoint'
   })
}