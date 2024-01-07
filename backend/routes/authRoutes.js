/**
 * backend/routes/authRoutes.js
 */
import express from 'express';
import {signUp, signIn, signOut} from '../controllers/authController.js';

const router = express.Router();

//**************** auth routes ****************//
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/sign-out', signOut);


export default router;