import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
import EmailVerification from '../models/emailVerificationModel.js';
import { isValidObjectId } from 'mongoose';
import { generateOTPCode, generateMailTransporter } from '../utils/mailHandlers.js';
import ErrorHandler from '../utils/errorHandler.js';

export const signUp = async (req, res) => {
   const {name, email, password} = req.body

   const existingUser = await User.findOne({email});

   if (existingUser) {
      /*return res.status(400).json({error: 'Email already exists!'});*/
      return new ErrorHandler('Email already exists!', 401);

   }

   const newUser = new User({name, email, password});
   await newUser.save();

   /**************** generate 6 digit OTP****************/
   let OTP = generateOTPCode();

   /**************** store OTP in database ****************/
   const newEmailVerification = new EmailVerification({
      owner: newUser._id,
      token: OTP
   });
   await newEmailVerification.save();

   /**************** send OTP to user email ****************/
   var transport = generateMailTransporter();

   transport.sendMail({
      from: 'verification@mern_auth_ultimate.com',
      to: newUser.email,
      subject: 'Email Verification',
      html: `
      <h1>Email Verification Code</h1>
      <h2>Please find below your verification code</h2>
      <h3>${OTP}</h3>
    `
   });

   res.status(201).json({message: `Please verify your email. OTP has been sent to ${newUser.email}`});

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

export const verifyEmail = async (req, res) => {
   const {userId, OTP} = req.body;

   if (!isValidObjectId(userId)) {
      /*return res.json({error: 'Invalid user!'});*/
      return new ErrorHandler('Invalid user!', 401);
   }

   const user = await User.findById(userId)
   if (!user) {
      /*return res.json({error: 'User not found!'});*/
      return new ErrorHandler('User not found!', 401);

   }

   if (user.isVerified) {
      /*return res.json({error: 'User already verified!'});*/
      return new ErrorHandler('User already verified!', 401);
   }

   const token = await EmailVerification.findOne({owner: userId})
   if (!token) {
      /*return res.json({error: 'Token not found!'});*/
      return new ErrorHandler('Token not found!', 404);
   }

   const isMatched = await token.compareToken(OTP)
   if (!isMatched) {
      /*return res.json({error: 'Please submit a valid OTP!'});*/
      return new ErrorHandler('Invalid OTP code!', 401);
   }

   user.isVerified = true;
   await user.save();

   await EmailVerification.findByIdAndDelete(token._id);

   var transport = generateMailTransporter();

   transport.sendMail({
      from: 'verification@mern_auth_ultimate.com',
      to: user.email,
      subject: 'Welcome Email',
      html: `
        <h1>Welcome To MERN Auth Ultimate</h1>
        <h2>Thanks for verifying your email</h2>      
`
   })

   res.json({message: 'Your email has been verified.'})

};

export const resendEmailVerification = async (req, res) => {
   const {userId} = req.body;

   const user = await User.findById(userId);
   if (!user) {
      /*return res.json({error: 'User not found!'});*/
      return new ErrorHandler('User not found!');
   }

   if (user.isVerified){
      /*return res.json({error: 'Email already verified!'});*/
      return new ErrorHandler('Email already verified!', 401);
   }

   const alreadyHasToken = await EmailVerification.findOne({
      owner: userId,
   });
   if (alreadyHasToken)
      /*return res.json({error: 'After one hour, request for another token!'});*/
      return new ErrorHandler('Token already exists! After one hour, request another token!', 401);

   /**************** generate 6 digit OTP****************/
   let OTP = generateOTPCode();

   /**************** store OTP in database ****************/
   const newEmailVerification = new EmailVerification({
      owner: user._id,
      token: OTP
   })
   await newEmailVerification.save()

   /**************** send OTP to user email ****************/
   var transport = generateMailTransporter();

   transport.sendMail({
      from: 'verification@mern_auth_ultimate.com',
      to: user.email,
      subject: 'Resent Email Verification',
      html: `
        <h1>Resent Email Verification</h1>
        <h2>Please find below your new verification code</h2>
        <h3>${OTP}</h3>
        `
   });

   res.json({
      message: `Please verify your email.  New OTP has been sent to ${user.email}.`
   });
};