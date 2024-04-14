import express from 'express';
import { UserController } from '../controllers/userController.js';
import { ContactController } from '../controllers/contactController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateRegistrationUserInput } from '../serializers/userSerializer.js';
import { responseMiddleware } from '../middleware/responseMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register/', validateRegistrationUserInput, UserController.register, responseMiddleware);
userRouter.post('/login', UserController.login, responseMiddleware);
userRouter.get('/search', verifyToken, UserController.search, responseMiddleware);


export default userRouter;
