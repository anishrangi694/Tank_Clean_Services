import express from 'express';
import { createRequest, getMyRequest,getRequests, updateRequests,getRequest } from '../controller/requestController.js';
import { isAdmin, isLoggedIn } from '../middlewares/authmiddleware.js';
import upload from '../middlewares/multer.js';

const reqRouter= express.Router();
//user routes
reqRouter.post('/add',isLoggedIn,upload.single('image'),createRequest);
reqRouter.get('/my',isLoggedIn,getMyRequest);


//admin routes
reqRouter.get('/',isLoggedIn,isAdmin, getRequests);
reqRouter.put('/:id/status',isLoggedIn,isAdmin,updateRequests);

// //for both
reqRouter.get('/:id',isLoggedIn, getRequest)

export default reqRouter;