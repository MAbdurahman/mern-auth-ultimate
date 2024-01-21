//**************** imports ****************//
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userModel = new mongoose.Schema({
   username: {
      type: String,
      trim: true,
      required: true,
      unique: false,
      maxLength: [32, "Name cannot exceed 32 characters!"],
      minLength: [3, "Name should have more than 3 characters!"],
   },
   email: {
      type: String,
      trim: true,
      required: true,
      unique: true

   },
   password: {
      type: String,
      required: true,
      minLength: [8, "Name should have at least 8 characters!"],
   },
   isVerified: {
      type: Boolean,
      required: true,
      default: false
   }
});

userModel.pre("save", async function (next) {
   if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
   }
   next();
});

userModel.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userModel);

export default User;