
import express from 'express';
import {createActor} from '../controllers/actorController.js';


const router = express.Router();

//**************** actor routes ****************//
router.post('/create-actor', createActor);






export default router;