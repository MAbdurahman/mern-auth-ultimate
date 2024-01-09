
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

emailVerificationModel.methods.compareToken = async function (token) {
   const result = await bcrypt.compare(token, this.token);
   return result;
};

const EmailVerification = mongoose.model('emailVerification', emailVerificationModel)
export default EmailVerification;