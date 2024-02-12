import express from 'express';
import {createActor} from '../controllers/actorController.js';
import {uploadImage} from '../middlewares/multerMiddleware.js';
import {
   validateActorInformation, executeValidator
} from '../middlewares/validateHandlerMiddleware.js';


const router = express.Router();

//**************** actor routes ****************//
router.post('/create-actor', uploadImage.single('avatar'), validateActorInformation, executeValidator, createActor);


export default router;