import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import EmailVerificationToken from '../models/emailVerificationTokenModel.js';
import PasswordResetToken from '../models/passwordResetTokenModel.js';
import {isValidObjectId} from 'mongoose';
import {
   generateOTPCode,
   generateMailTransporter,
   generateRandomByte
} from '../utils/mailHandlers.js';
import {errorMessageHandler} from '../utils/errorMessageUtils.js';

export const signUp = async (req, res, next) => {
   const {username, email, password} = req.body;

   if (!username) {
      return errorMessageHandler(res, 'Please enter username!', 400);
   }
   if (!email) {
      return errorMessageHandler(res, 'Please enter email!', 400);
   }
   if (!password) {
      return errorMessageHandler(res, 'Please enter password!', 400);
   }

   const existingUser = await User.findOne({email});

   if (existingUser) {
      return errorMessageHandler(res, 'Email already exists!', 400);

   }

   const newUser = new User({username, email, password});
   await newUser.save();

   /**************** generate 6 digit OTP****************/
   let OTP = generateOTPCode();

   /**************** store OTP in database ****************/
   const newEmailVerificationToken = new EmailVerificationToken({
      owner: newUser._id, token: OTP
   });
   await newEmailVerificationToken.save();

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

   res.status(201).json({
      user: {
         id: newUser._id, username: newUser.username, email: newUser.email,
      },
   });
};

export const signIn = async (req, res, next) => {
   const {email, password} = req.body;
   /**************** check if email and password is entered by user****************/
   if (!email) {
      return errorMessageHandler(res, 'Please enter email!', 400);
   }
   if (!password) {
      return errorMessageHandler(res, 'Please enter password!', 400);
   }
   /**************** finding user in database ****************/
   const user = await User.findOne({email});
   if (!user) {
      return errorMessageHandler(res, 'Invalid email or password!', 401);
   }
   /**************** checks if password is correct or not ****************/
   const isMatchedPasswords = await user.comparePassword(password);

   if (!isMatchedPasswords) {
      return errorMessageHandler(res, 'Invalid email or password!', 401);
   }
   const {_id, username} = user;
   const jwtToken = jwt.sign({userId: _id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_TIME});

   await res.status(201).json({
      user: {id: _id, username, email, token: jwtToken}
   });
};

export const signOut = async (req, res) => {
   await res.json({
      data: 'auth/sign-out endpoint'
   })
};

export const verifyEmailToken = async (req, res, next) => {
   const {userId, OTP} = req.body;

   if (!isValidObjectId(userId)) {
      return errorMessageHandler(res, 'Invalid user!', 401);
   }

   const user = await User.findById(userId)
   if (!user) {
      return errorMessageHandler(res, 'User not found!', 404);
   }

   if (user.isVerified) {
      return errorMessageHandler(res, 'User already verified!', 400);
   }

   const token = await EmailVerificationToken.findOne({owner: userId})
   if (!token) {
      return errorMessageHandler(res, 'Token not found!', 404);
   }

   const isMatched = await token.compareToken(OTP)
   if (!isMatched) {
      return errorMessageHandler(res, 'Invalid OTP code!', 400);
   }

   user.isVerified = true;
   await user.save();
   /**************** delete the email verification ****************/
   await EmailVerificationToken.findByIdAndDelete(token._id);
   /**************** send message to user email ****************/
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

   const {username, email} = user;
   const jwtToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY);

   res.json({
      user: { id: user._id, username, email, token: jwtToken },
      message: 'Your email has been verified.',
   });
};

export const resendEmailVerificationToken = async (req, res, next) => {
   const {userId} = req.body;

   const user = await User.findById(userId);
   if (!user) {
      return errorMessageHandler(res, 'User not found!', 404);
   }

   if (user.isVerified) {
      return errorMessageHandler(res, 'Email already verified!', 400);
   }

   const alreadyHasToken = await EmailVerificationToken.findOne({
      owner: userId,
   });
   if (alreadyHasToken)
   return errorMessageHandler(res, 'Token already exists! After an hour, request another token!', 400);

   /**************** generate 6 digit OTP****************/
   let OTP = generateOTPCode();

   /**************** store OTP in database ****************/
   const newEmailVerification = new EmailVerificationToken({
      owner: user._id, token: OTP
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

export const forgotPassword = async (req, res, next) => {
   const {email} = req.body;

   if (!email) {
      return errorMessageHandler(res, 'Email is required!', 400);

   }

   const user = await User.findOne({email});
   if (!user) {
      return errorMessageHandler(res, 'User not found!', 400);
   }

   const alreadyHasToken = await PasswordResetToken.findOne({owner: user._id});
   if (alreadyHasToken) {
      return errorMessageHandler(res, 'Token already exists! After an hour, request another token', 400);
   }

   const token = await generateRandomByte();
   const newPasswordResetToken = await PasswordResetToken({
      owner: user._id, token,
   });
   await newPasswordResetToken.save();

   const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

   const transport = generateMailTransporter();

   transport.sendMail({
      from: 'security@mern_auth_ultimate.com',
      to: user.email,
      subject: 'Reset Password',
      html: `
      <h1>Click the link below to your reset password</h1>
      <p>
        <a href='${resetPasswordUrl}'>Reset Password Link</a>
      </p> 
    `,
   });
   res.json({message: `A link was sent to your email at ${user.email}.`});

};

export const verifyPasswordResetToken = async (req, res) => {
   await res.status(201).json({valid: true});
};

export const resetPassword = async (req, res, next) => {
   const {newPassword, userId} = req.body;

   const user = await User.findById(userId);
   const matched = await user.comparePassword(newPassword);
   if (matched) {
      return errorMessageHandler(res, 'New password must be different than the old password!', 400);
   }

   user.password = newPassword;
   await user.save();

   await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

   const transport = generateMailTransporter();
   transport.sendMail({
      from: 'security@mern_auth_ultimate.com',
      to: user.email,
      subject: 'Password Reset Successfully',
      html: `
      <h1>Password Reset Successfully</h1>
      <p>Your password was successfully reset.</p>
      <p>Sign in using your new password.</p>
    `,
   });

   res.status(201).json({
      message: 'Password reset successfully!'
   });
};

export const handleNotFound = (req, res, next) => {
   return errorMessageHandler(res, 'Resource not found!', 404);
};

export const isAuthorized = async (req, res, next) => {
   const { user } = req;
   /*const {username, email} = user;*/

   await res.json({ user: { id: user._id, username: user.username, email: user.email } });
};