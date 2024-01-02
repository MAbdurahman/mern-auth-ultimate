/**
 * backend/routes/authRoutes.js
 */
import express from 'express';
import {signUp, signIn, signOut} from '../controllers/authController.js';
import {userSignUpValidator} from '../validators/authValidators.js';
import {runValidation} from '../validators/runValidation.js';

const router = express.Router();

//**************** auth routes ****************//
router.post('/sign-up',userSignUpValidator, runValidation, signUp);
router.post('/sign-in', signIn);
router.get('/sign-out', signOut);


export default router;