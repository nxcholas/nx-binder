import express from 'express';
import { registerUser } from '../controllers/userController.mjs';

const userRouter = express.Router();

// POST
userRouter.post('/register', registerUser)

export default userRouter;