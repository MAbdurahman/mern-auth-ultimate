
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const emailVerificationModel = mongoose.Schema({
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   token: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now(),
   },
});

emailVerificationModel.pre("save", async function (next) {
   if (this.isModified("token")) {
      this.token = await bcrypt.hash(this.token, 10);
   }

   next();
});

const EmailVerification = mongoose.model('emailVerification', emailVerificationModel)
export default EmailVerification;