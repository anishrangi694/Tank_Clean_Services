import { Booking_fee, getPrice } from "../config/pricingConfig.js";

import {
  createPaymentRepo,
  updatePaymentByIdRepo,
} from "../repository/paymentRepo.js";

import {
  createReqRepo,
  getMyReqRepo,
  getRequestRepo,
  getRequestsRepo,
  linkPaymentToReqRepo,
  updateStatusRepo,
} from "../repository/requestRepo.js";

import { RAZORPAY_API_KEY } from "../config/serverConfig.js";
import { createRazorpayOrder } from "./paymentService.js";

export const createReqService = async (reqDetails) => {
  const estimatedPrice = getPrice(
    reqDetails.tankType,
    reqDetails.tankSize
  );

  // 1. Create the request
  const request = await createReqRepo({
    user: reqDetails.user,
    tankType: reqDetails.tankType,
    tankSize: reqDetails.tankSize,
    address: reqDetails.address,
    city: reqDetails.city,
    pincode: reqDetails.pincode,
    contact: reqDetails.contact,
    preferredDate: reqDetails.preferredDate,
    notes: reqDetails.notes,
    image: reqDetails.image,
    estimatePrice: estimatedPrice,
    status: "Pending",
  });

  // 2. Create the payment record
  const payment = await createPaymentRepo({
    request: request._id,
    user: reqDetails.user,
    bookingFee: Booking_fee,
    paymentStatus: "Pending",
  });

  // 3. Link payment to request
  const updatedRequest = await linkPaymentToReqRepo(
    request._id,
    payment._id
  );

  // 4. Create Razorpay order
  const order = await createRazorpayOrder({
    amount: Booking_fee,
    receipt: `rcpt_${payment._id}`,
  });

  // 5. Save Razorpay order ID
  await updatePaymentByIdRepo(payment._id, {
    razorpayOrderId: order.id,
  });

  return {
    request: updatedRequest,
    payment,
    order: {
      orderId: order.id,
      amount: Booking_fee,
      currency: "INR",
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