import express from 'express';
import { SpamController } from '../controllers/spamController.js';
import { verifyToken } from '../middleware/verifyToken.js';


const spamRouter = express.Router();

spamRouter.post('', verifyToken, SpamController.markSpam);
spamRouter.get('', SpamController.getSpamByPhoneNumber);


export default spamRouter;
