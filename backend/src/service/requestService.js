
import {Booking_fee, getPrice } from "../config/pricingConfig.js";
import { RAZORPAY_API_KEY } from "../config/serverConfig.js";
import { createRazorpayOrder } from "./paymentService.js";

import {
  getMyReqRepo,
  getRequestRepo,
  getRequestsRepo,
  updateStatusRepo,
} from "../repository/requestRepo.js";

// Create Razorpay order only.
// Do not save the request or payment in MongoDB here.
export const createReqService = async (reqDetails) => {
  const estimatedPrice = getPrice(
    reqDetails.tankType,
    reqDetails.tankSize
  );

  const order = await createRazorpayOrder({
    amount: Booking_fee,
    receipt: `tank_${Date.now()}`,
  });

  return {
    estimatePrice: estimatedPrice,
    order: {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: RAZORPAY_API_KEY,
    },
  };
};

export const getMyReqService = async (userId) => {
  return await getMyReqRepo(userId);
};

export const getRequestsService = async () => {
  return await getRequestsRepo();
};

export const updateStatusService = async (reqId, updates) => {
  return await updateStatusRepo(reqId, updates);
};

export const getReqService = async (reqId) => {
  return await getRequestRepo(reqId);
};
