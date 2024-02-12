
import multer from 'multer';

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
   if (!file.mimetype.startsWith('image')) {
      cb('Only image files are supported!', false);
   }
   cb(null, true);
};

export const uploadImage = multer({ storage, fileFilter });