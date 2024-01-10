import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const passwordResetTokenModel = mongoose.Schema({
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
passwordResetTokenModel.pre("save", async function (next) {
   if (this.isModified("token")) {
      this.token = await bcrypt.hash(this.token, 10);
   }

   next();
});

passwordResetTokenModel.methods.compareToken = async function (token) {
   return await bcrypt.compare(token, this.token);
};

const PasswordResetToken = mongoose.model('passwordResetToken', passwordResetTokenModel)
export default PasswordResetToken;