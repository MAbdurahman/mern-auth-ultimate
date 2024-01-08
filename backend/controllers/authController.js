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
      <h1>Your verification OTP</h1>
      <h2>${OTP}</h2>
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