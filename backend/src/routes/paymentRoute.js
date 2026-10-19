import express from "express";
import upload from "../middlewares/multer.js";
import {
  getPaymentByRequest,
  verifyBookingPayment,
  cancelBookingPayment,
} from "../controller/paymentController.js";

import { isLoggedIn } from "../middlewares/authmiddleware.js";

const paymentRouter = express.Router();

paymentRouter.post(
  "/verify-booking",
  isLoggedIn,
  upload.single("image"),
  verifyBookingPayment
);

paymentRouter.post(
  "/cancel-booking",
  isLoggedIn,
  cancelBookingPayment
);

paymentRouter.get(
  "/requests/:requestId",
  isLoggedIn,
  getPaymentByRequest
);

export default paymentRouter;