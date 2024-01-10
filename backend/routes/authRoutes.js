/**
 * backend/routes/authRoutes.js
 */
import express from 'express';
import {signUp, signIn, signOut, verifyEmail, resendEmailVerification} from '../controllers/authController.js';
import {validateUser, executeValidateUser} from '../middlewares/validateHandler.js';

const router = express.Router();

//**************** auth routes ****************//
router.post('/sign-up', validateUser, executeValidateUser, signUp);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification', resendEmailVerification);
router.post('/sign-in', signIn);
router.get('/sign-out', signOut);


export default router;