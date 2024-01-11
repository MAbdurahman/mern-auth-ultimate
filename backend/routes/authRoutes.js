
import express from 'express';
import {
   signUp,
   signIn,
   signOut,
   verifyEmailToken,
   resendEmailVerificationToken,
   forgotPassword,
   verifyPasswordResetToken,
   resetPassword
} from '../controllers/authController.js';
import {
   validateUser,
   validatePassword,
   executeValidator
} from '../middlewares/validateHandlerMiddleware.js';
import {
   validatePasswordResetToken
} from '../middlewares/passwordResetHandlerMiddleware.js';

const router = express.Router();

//**************** auth routes ****************//
router.post('/sign-up', validateUser, executeValidator, signUp);
router.post('/verify-email-token', verifyEmailToken);
router.post('/resend-email-verification-token', resendEmailVerificationToken);
router.post('/forgot-password', forgotPassword);
router.post('/verify-password-reset-token', validatePasswordResetToken, verifyPasswordResetToken);
router.post('/reset-password', validatePassword, executeValidator, validatePasswordResetToken, resetPassword);
router.post('/sign-in', signIn);
router.get('/sign-out', signOut);

export default router;