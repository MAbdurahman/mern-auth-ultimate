
import express from 'express';
import {createActor} from '../controllers/actorController.js';
import {uploadImage} from '../middlewares/multerMiddleware.js';


const router = express.Router();

//**************** actor routes ****************//
router.post('/create-actor', uploadImage.single('avatar'), createActor);






export default router;