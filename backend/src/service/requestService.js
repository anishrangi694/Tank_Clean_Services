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
  const estimatedPrice = getPrice(reqDetails.tankType, reqDetails.tankSize);

  //1. save request
  const request = await createReqRepo({
    user: reqDetails.user,
    tankType: reqDetails.tankType,
    tankSize: reqDetails.tankSize,
    address: reqDetails.address,
    contact: reqDetails.contact,
    preferredDate: reqDetails.preferredDate,
    notes: reqDetails.notes,
    image: reqDetails.image,
    estimatePrice: estimatedPrice,
    status: "Pending",
  });

  //2.create payment record
  const payment = await createPaymentRepo({
    request: request._id,
    user: reqDetails.user,
    bookingFee: Booking_fee,
    paymentStatus: "Pending",
  });

  //3.upadte the request to link payment
  const updatedRequest = await linkPaymentToReqRepo(request._id, payment._id);

  // 4. create RazorPay Order
  const order = await createRazorpayOrder({
    amount: Booking_fee,
    receipt: `rcpt_${payment._id}`,
  });

  //5. save order id in payment
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
  const request = await getMyReqRepo(userId);
  return request;
};

export const getRequestsService = async () => {
  const requets = await getRequestsRepo();
  return requets;
};

export const updateStatusService = async (reqId, updates) => {
  const request = await updateStatusRepo(reqId, updates);
  return request;
};

export const getReqService = async (reqId) => {
  const request = await getRequestRepo(reqId);
  return request;
};
