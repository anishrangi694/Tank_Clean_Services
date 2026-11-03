import {getPaymentByReqService,verifyBookingPaymentService,cancelBookingPaymentService} from "../service/paymentService.js";

export const verifyBookingPayment = async (req, res) => {
  try {
    const result = await verifyBookingPaymentService({
      ...req.body,

      // Authenticated user's ID
      userId: req.user.id,

      // Booking form details
      form: {
        tankType: req.body.tankType,
        tankSize: req.body.tankSize,
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
        contact: req.body.contact,
        preferredDate: req.body.preferredDate,
        notes: req.body.notes,
      },

      // Image uploaded through Multer, if provided
      image: req.file?.path || null,
    });

    return res.status(200).json({
      message: "Payment successful and booking confirmed",
      data: result,
      success: true,
    });
  } catch (error) {
    console.error("Verify booking payment error:", error);

    return res.status(400).json({
      message: error.message || "Payment verification failed",
      success: false,
    });
  }
};

export const getPaymentByRequest = async (req, res) => {
  try {
    const payment = await getPaymentByReqService(
      req.params.requestId
    );

    return res.status(200).json({
      message: "Payment fetched successfully",
      data: payment,
      error: {},
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Payment not fetched",
      data: {},
      error: error.message,
      success: false,
    });
  }
};

export const cancelBookingPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const result = await cancelBookingPaymentService({
      paymentId,
      userId: req.user.id,
    });

    return res.status(200).json({
      message: "Booking payment cancelled",
      data: result,
      error: {},
      success: true,
    });
  } catch (error) {
    console.error("Cancel booking payment error:", error);

    const statusCode =
      error.message === "Payment record not found"
        ? 404
        : error.message ===
            "You are not allowed to cancel this payment"
          ? 403
          : 400;

    return res.status(statusCode).json({
      message: error.message || "Could not cancel booking payment",
      data: {},
      error: error.message,
      success: false,
    });
  }
};
