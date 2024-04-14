import express from 'express';
import { ContactController } from '../controllers/contactController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { responseMiddleware } from '../middleware/responseMiddleware.js';

const contactRouter = express.Router();
contactRouter.post('', verifyToken, ContactController.addContact)
contactRouter.get('', verifyToken, ContactController.getContacts, responseMiddleware);
contactRouter.get('/search', verifyToken, ContactController.searchContacts, responseMiddleware);


export default contactRouter;
