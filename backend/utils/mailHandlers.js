import nodemailer from 'nodemailer';

export const generateOTPCode = (otp_length = 6) => {
   let OTP = "";
   for (let i = 1; i <= otp_length; i++) {
      const randomVal = Math.round(Math.random() * 9);
      OTP += randomVal;
   }
   return OTP;
}

export const generateMailTransporter = () =>
   nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
         user: process.env.MAIL_TRAP_USER,
         pass: process.env.MAIL_TRAP_PASS
      }
   });