import express from 'express';
import { getUser, loginUser, registerUser,logoutUser } from '../controller/userController.js';
import { isLoggedIn } from '../middlewares/authmiddleware.js';

const userRouter= express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/logout',isLoggedIn, logoutUser)
userRouter.get('/profile',isLoggedIn,getUser);

export default userRouter;