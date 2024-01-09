import nodemailer from 'nodemailer';
import User from '../models/userModel.js';
import EmailVerification from '../models/emailVerificationModel.js';


export const signUp = async (req, res) => {
   const {name, email, password} = req.body

   const existingUser = await User.findOne({email});

   if (existingUser) {
      return res.status(400).json({error: 'Email already exists!'});

   }

   const newUser = new User({name, email, password});
   await newUser.save();

   /**************** generate 6 digit OTP****************/
   let OTP = "";
   for (let i = 1; i <= 5; i++) {
      const randomValue = Math.round(Math.random() * 9);
      OTP += randomValue;
   }

   /**************** store OTP in database ****************/
   const newEmailVerification = new EmailVerification({ owner: newUser._id, token: OTP });
   await newEmailVerification.save();

   /**************** send OTP to user email ****************/
   var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: process.env.MAIL_TRAP_USER ,
         pass: process.env.MAIL_TRAP_PASS
      }
   });

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

   res.status(201).json({ message: `Please verify your email. OTP has been sent to ${newUser.email}` });

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
   const { userId, OTP } = req.body

   if (!isValidObjectId(userId)) {
      return res.json({ error: "Invalid user!" })
   }

   const user = await User.findById(userId)
   if (!user) {
      return res.json({ error: "User not found!" })
   }

   if (user.isVerified) {
      return res.json({ error: "User already verified!" })
   }

   const token = await EmailVerification.findOne({ owner: userId })
   if (!token) {
      return res.json({ error: 'Token not found!' })
   }

   const isMatched = await token.compareToken(OTP)
   if (!isMatched) {
      return res.json({ error: 'Please submit a valid OTP!' })
   }

   user.isVerified = true;
   await user.save();

   await EmailVerification.findByIdAndDelete(token._id);

   var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: process.env.MAIL_TRAP_USER ,
         pass: process.env.MAIL_TRAP_PASS
      }
   });

   transport.sendMail({
      from: 'verification@mern_auth_ultimate.com',
      to: user.email,
      subject: 'Welcome Email',
      html: '<h1>Welcome to our app, and thanks for verifying your email.</h1>'
   })

   res.json({ message: "Your email has been verified." })

};