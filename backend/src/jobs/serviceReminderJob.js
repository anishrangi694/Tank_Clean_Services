import cron from "node-cron";
import { sendServiceDueReminders } from "../service/notificationService.js";

const run = async () => {
  try {
    await sendServiceDueReminders();
  } catch (error) {
    console.log("service reminder job failed", error.message);
  }
};

export const startServiceReminderJob = () => {
  // cron job: every day at 9:00 AM India time
  cron.schedule("0 9 * * *", run, { timezone: "Asia/Kolkata" });

  // catch-up run shortly after startup, in case the server was off at 9 AM
  setTimeout(run, 10 * 1000);

  console.log("service reminder cron scheduled: daily at 9:00 AM IST");
};