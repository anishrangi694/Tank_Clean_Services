import { sendEmail } from "../utils/sendEmail.js";
import { findUserByIdRepo } from "../repository/userRepo.js";
import {
  findServiceDueRequestsRepo,
  claimServiceDueRepo,
  releaseServiceDueClaimRepo,
  stopServiceRemindersRepo,
  hasNewerBookingRepo,
} from "../repository/requestRepo.js";
import { FRONTEND_URL } from "../config/serverConfig.js";

export const SERVICE_INTERVAL_MONTHS = 6; // first reminder after this many months
export const REMINDER_GAP_DAYS = 15;      // gap between repeat reminders
export const MAX_REMINDERS = 3;           // stop after this many reminders

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

const escapeHtml = (str = "") =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export const sendServiceDueEmail = async (request, reminderNo = 1) => {
  const user = await findUserByIdRepo(request.user);
  if (!user) return;

  const lastDate = new Date(request.completedAt || request.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
  const bookUrl = `${FRONTEND_URL}/request`;

  const text =
    `Hi ${user.name},\n\n` +
    `It has been over ${SERVICE_INTERVAL_MONTHS} months since we cleaned your tank, so it is time for its next service.\n\n` +
    `Tank: ${request.tankType} (${request.tankSize})\n` +
    `Address: ${request.address}, ${request.city}\n` +
    `Last cleaned: ${lastDate}\n\n` +
    `Regular cleaning keeps your water safe and your tank healthy. Book your next service here:\n${bookUrl}\n\n` +
    `Tank Clean Services`;

  const html =
    `<p>Hi ${escapeHtml(user.name)},</p>` +
    `<p>It has been over <b>${SERVICE_INTERVAL_MONTHS} months</b> since we cleaned your tank, so it is time for its next service.</p>` +
    `<ul><li>Tank: ${escapeHtml(request.tankType)} (${escapeHtml(request.tankSize)})</li>` +
    `<li>Address: ${escapeHtml(request.address)}, ${escapeHtml(request.city)}</li>` +
    `<li>Last cleaned: ${lastDate}</li></ul>` +
    `<p>Regular cleaning keeps your water safe and your tank healthy.</p>` +
    `<p><a href="${bookUrl}">Book your next service</a></p>` +
    `<p>Tank Clean Services</p>`;

  await sendEmail({
    to: user.email,
    subject: reminderNo > 1 ? "Reminder: your tank service is due" : "Your tank service is due",
    text,
    html,
  });
};

// Finds completed jobs that are 6+ months old and emails the customer,
// repeating every 15 days (up to MAX_REMINDERS) until they book again.
export const sendServiceDueReminders = async () => {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - SERVICE_INTERVAL_MONTHS);
  const gapDate = new Date(Date.now() - REMINDER_GAP_DAYS * 24 * 60 * 60 * 1000);

  const due = await findServiceDueRequestsRepo(cutoff, gapDate, MAX_REMINDERS);
  let sent = 0;

  for (const request of due) {
    try {
      // customer already re-booked this tank: stop reminders for good
      if (await hasNewerBookingRepo(request)) {
        await stopServiceRemindersRepo(request._id, MAX_REMINDERS);
        continue;
      }

      // claim first so the same reminder is never emailed twice
      const claimed = await claimServiceDueRepo(request._id, gapDate, MAX_REMINDERS);
      if (!claimed) continue;

      try {
        await sendServiceDueEmail(claimed, claimed.serviceReminderCount);
        sent++;
      } catch (error) {
        // email failed: release the claim so the next run retries
        await releaseServiceDueClaimRepo(request._id, request.serviceDueNotifiedAt);
        console.log("service due email not sent", request._id.toString(), error.message);
      }
    } catch (error) {
      console.log("service reminder error", request._id.toString(), error.message);
    }
  }

  console.log(`service due reminders: ${sent} sent, ${due.length} checked`);
  return sent;
};