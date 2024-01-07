//**************** imports ****************//
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userModel = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: [true, 'Please enter your name!'],
      maxLength: [31, 'Name cannot exceed 31 characters!'],
   },
   email: {
      type: String,
      trim: true,
      required: [true, 'Please enter your email!'],
      unique: [true, 'Email already exists!'],

   },
   password: {
      type: String,
      required: [true, 'Please enter your password!'],
      minlength: [8, 'Password must be at least 8 characters!'],
      /*select: false,*/
   },
   isVerified: {
      type: Boolean,
      required: true,
      default: false,
   }
});

userModel.pre("save", async function (next) {
   if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
   }
   next();
});

const User = mongoose.model('User', userModel);

export default User;