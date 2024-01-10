
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const emailVerificationTokenModel = mongoose.Schema({
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
emailVerificationTokenModel.pre("save", async function (next) {
   if (this.isModified("token")) {
      this.token = await bcrypt.hash(this.token, 10);
   }

   next();
});

emailVerificationTokenModel.methods.compareToken = async function (token) {
   const result = await bcrypt.compare(token, this.token);
   return result;
};

const EmailVerificationToken = mongoose.model('emailVerificationToken', emailVerificationTokenModel)
export default EmailVerificationToken;