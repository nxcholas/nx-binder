import express from 'express';
import { addCard, deleteCard, loginUser, registerUser } from '../controllers/userController.mjs';
import protect from '../middleware/authMiddleware.mjs';

const userRouter = express.Router();

// POST
userRouter.post('/api/register', registerUser)
userRouter.post('/api/login', loginUser)

userRouter.route('/api/binder/addcard').post(protect, addCard)

// DELETE
userRouter.route('/api/binder/deletecard/:_id').delete(protect, deleteCard);

export default userRouter;