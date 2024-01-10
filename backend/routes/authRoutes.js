/**
 * backend/routes/authRoutes.js
 */
import express from 'express';
import {signUp, signIn, signOut, verifyEmailToken, resendEmailVerificationToken, forgotPassword} from '../controllers/authController.js';
import {validateUser, executeValidateUser} from '../middlewares/validateHandlerMiddleware.js';

const router = express.Router();

//**************** auth routes ****************//
router.post('/sign-up', validateUser, executeValidateUser, signUp);
router.post('/verify-email-token', verifyEmailToken);
router.post('/resend-email-verification-token', resendEmailVerificationToken);
router.post('/forgot-password', forgotPassword);
router.post('/sign-in', signIn);
router.get('/sign-out', signOut);


export default router;