import express from 'express';
import { getPaymentByRequest, verifyBookingPayment } from '../controller/paymentController.js';
import {isLoggedIn} from '../middlewares/authmiddleware.js'

const paymentRouter= express.Router();

paymentRouter.post('/verify-booking',isLoggedIn, verifyBookingPayment);
paymentRouter.get('/requests/:requestId',isLoggedIn, getPaymentByRequest);

export default paymentRouter;