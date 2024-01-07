
import User from '../models/userModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';



export const signUp = catchAsyncError( async (req, res, next) => {
	await res.json({
		data: 'auth/sign-up endpoint'
	})
 
});

export const signIn = catchAsyncError( async (req, res, next) => {
   await res.json({
      data: 'auth/sign-in endpoint'
   })
});

export const signOut = catchAsyncError( async (req, res) => {
    await res.json({
      data: 'auth/sign-out endpoint'
   })
});