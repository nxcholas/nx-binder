import express from 'express';
import { addCard, deleteCard, loginUser, registerUser } from '../controllers/userController.mjs';
import protect from '../middleware/authMiddleware.mjs';

const userRouter = express.Router();

// POST
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// GET
userRouter.route('/binder/addcard').post(protect, addCard)

// DELETE
userRouter.route('/binder/deletecard/:_id').delete(protect, deleteCard);

export default userRouter;