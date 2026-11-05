import { sendEmail } from "../utils/sendEmail.js";
import { findUserByIdRepo } from "../repository/userRepo.js";

const messages = {
  Confirmed: "Your tank cleaning booking is confirmed. Our team will visit on your preferred date.",
  "In Progress": "Our team has started cleaning your tank.",
  Completed: "Your tank cleaning is completed. Thank you for choosing Tank Clean Services!",
  Cancelled: "Your tank cleaning request has been cancelled.",
};

export const sendRequestStatusEmail = async (request) => {
  try {
    const message = messages[request.status];
    if (!message) return;

    const user = await findUserByIdRepo(request.user);
    if (!user) return;

    const text =
      `Hi ${user.name},\n\n` +
      `${message}\n\n` +
      `Tank: ${request.tankType} (${request.tankSize})\n` +
      `Address: ${request.address}, ${request.city}\n` +
      `Status: ${request.status}\n\n` +
      `Tank Clean Services`;

    await sendEmail({
      to: user.email,
      subject: `Tank Cleaning - ${request.status}`,
      text,
    });
  } catch (error) {
    console.log("status email not sent", error.message);
  }
};