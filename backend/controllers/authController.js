import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import {validateName, validateEmail, validatePassword} from '../utils/validateHandler.js';


export const signUp = async (req, res) => {
   const { name, email, password } = req.body

   const existingUser = await User.findOne({ email });

   if (existingUser) {
      return res.status(400).json({ error: "Email already exists!" });

   }

   const newUser = new User({ name, email, password })
   await newUser.save()

   res.status(201).json({ user: newUser })

};

export const signIn = async (req, res) => {
   await res.json({
      data: 'auth/sign-in endpoint'
   })
};

export const signOut = async (req, res) => {
    await res.json({
      data: 'auth/sign-out endpoint'
   })
};