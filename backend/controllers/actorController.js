import cloudinary from 'cloudinary';
import Actor from '../models/actorModel.js';
import {errorMessageHandler} from '../utils/errorMessageUtils.js';

cloudinary.v2.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
   secure: true
});


export const createActor = async (req, res, next) => {
   const {name, biography, gender} = req.body;
   const {file} = req;

   try {
      const newActor = new Actor({name, biography, gender});

      if (file) {
         /*const { secure_url, public_id } = await cloudinary.v2.uploader.upload(file.path);*/
         const {secure_url, publci_id} = await cloudinary.v2.uploader.upload(file, {
            folder: 'mern-auth-ultimate/actors', width: 150, crop: 'scale'
         });
         newActor.avatar = {url: secure_url, public_id};

      }
      await newActor.save();
      res.status(201).json({
         id: newActor._id, name, biography, gender, avatar: newActor.avatar?.url,
      });
   }
   catch (err) {
      return errorMessageHandler(res, err, 501);
      next();
   }

};