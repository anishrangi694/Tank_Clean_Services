import crypto from "crypto";
import Razorpay from "razorpay";
import {RAZORPAY_API_KEY,RAZORPAY_API_SECRET} from "../config/serverConfig.js";
import { Booking_fee, getPrice } from "../config/pricingConfig.js";
import SERVICE_AREA from "../config/serviceAreaConfig.js";
import {createPaymentRepo,getPaymentByIdRepo,getPaymentByReqRepo,getPaymentByRazorPayOrderIDRepo,updatePaymentByIdRepo} from "../repository/paymentRepo.js";
import {createReqRepo,linkPaymentToReqRepo} from "../repository/requestRepo.js";
import request from "../schema/requestSchema.js";
import Payment from "../schema/paymentSchema.js";

const razorpay = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_API_SECRET,
});

// Create Razorpay order only.
// No booking or payment records are saved here.
export const createRazorpayOrder = async ({ amount, receipt }) => {
  return await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt,
  });
};

// Verify payment, validate service area, then create booking.
export const verifyBookingPaymentService = async (data) => {
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature,userId,form,
    image,
  } = data;

  // 1. Validate the submitted service PIN code.
  const pincode = String(form?.pincode || "").trim();

  if (!pincode) {
    throw new Error("Please select your service PIN code.");
  }

  if (!SERVICE_AREA.supportedPincodes.includes(pincode)) {
    throw new Error("We do not currently serve this PIN code.");
  }

  // 2. Validate required booking details.
  if (
    !form?.tankType ||
    !form?.tankSize ||
    !form?.address ||
    !form?.city ||
    !form?.contact ||
    !form?.preferredDate
  ) {
    throw new Error("Please provide all required booking details.");
  }

  if (form.city.trim() !== SERVICE_AREA.city) {
    throw new Error("We currently serve Jodhpur only.");
  }

  // 3. Verify the Razorpay payment signature.

  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_API_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new Error("Payment verification failed.");
  }

  // 4. Verify the order with Razorpay.
  const order = await razorpay.orders.fetch(razorpay_order_id);

  if (
    order.status !== "paid" ||
    order.amount !== Booking_fee * 100 ||
    order.currency !== "INR"
  ) {
    throw new Error("Payment has not been completed");
  }

  // 5. Verify the payment itself.
  const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);

  if (
    razorpayPayment.order_id !== razorpay_order_id ||
    razorpayPayment.status !== "captured" ||
    razorpayPayment.amount !== Booking_fee * 100
  ) {
    throw new Error("Payment is not captured");
  }

  // 6. Prevent duplicate processing of the same order.
  const existingPayment =
    await getPaymentByRazorPayOrderIDRepo(razorpay_order_id);

  if (existingPayment) {
    throw new Error("This payment order has already been processed");
  }

  // 7. Calculate the estimated service price.
  const estimatePrice = getPrice(form.tankType, form.tankSize);

  // 8. Create the payment record after verification.
  const payment = await createPaymentRepo({
    user: userId,
    bookingFee: Booking_fee,
    paymentStatus: "Paid",
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    paidAt: new Date(),
  });

  try {
    // 9. Create the booking only after successful verification.
    const newRequest = await createReqRepo({
      user: userId,
      tankType: form.tankType,
      tankSize: form.tankSize,
      address: form.address,
      city: form.city,
      pincode,
      contact: form.contact,
      preferredDate: form.preferredDate,
      notes: form.notes || "",
      image: image || null,
      estimatePrice,
      status: "Confirmed",
      payment: payment._id,
    });

    await linkPaymentToReqRepo(newRequest._id, payment._id);

    return {
      request: newRequest,
      payment,
    };
  } catch (error) {
    // Avoid leaving an orphaned payment record if booking creation fails.
    await Payment.findByIdAndDelete(payment._id);
    throw error;
  }
};

export const getPaymentByReqService = async (reqId) => {
  const payment = await getPaymentByReqRepo(reqId);

  if (!payment) {
    throw new Error("Payment not found for this request");
  }

  return payment;
};

export const cancelBookingPaymentService = async ({ paymentId, userId }) => {
  if (!paymentId) {
    throw new Error("Payment ID is required");
  }

  const payment = await getPaymentByIdRepo(paymentId);

  if (!payment) {
    throw new Error("Payment record not found");
  }

  if (String(payment.user) !== String(userId)) {
    throw new Error("You are not allowed to cancel this payment");
  }

  if (payment.paymentStatus === "Paid") {
    throw new Error("Payment has already been completed");
  }

  if (payment.paymentStatus !== "Cancelled") {
    await updatePaymentByIdRepo(paymentId, {
      paymentStatus: "Cancelled",
    });
  }

  const requestData = payment.request
    ? await request.findById(payment.request)
    : null;

  if (
    requestData &&
    String(requestData.user) === String(userId) &&
    requestData.status === "Pending"
  ) {
    requestData.status = "Cancelled";
    await requestData.save();
  }

  return {
    success: true,
    paymentStatus: "Cancelled",
    requestStatus: requestData?.status,
  };
};
