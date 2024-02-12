//**************** imports ****************//
import mongoose from 'mongoose';

const actorModel = new mongoose.Schema({
      name: {
         type: String,
         trim: true,
         required: true,
      },
      biography: {
         type: String,
         trim: true,
         required: true,
      },
      gender: {
         type: String,
         trim: true,
         required: true,
      },
      avatar: {
         type: Object,
         url: String,
         public_id: String,
      }
   },
   {timestamps: true});
const Actor = mongoose.model('Actor', actorModel);

export default Actor;