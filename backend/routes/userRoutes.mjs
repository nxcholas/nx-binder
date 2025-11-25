import express from 'express';
import { addCard, loginUser, registerUser } from '../controllers/userController.mjs';
import protect from '../middleware/authMiddleware.mjs';

const userRouter = express.Router();

// POST
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// GET
userRouter.route('/addcard').post(protect, addCard)

export default userRouter;