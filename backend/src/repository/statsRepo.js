import Stats from "../schema/statsSchema.js";
import Request from "../schema/requestSchema.js";
import User from "../schema/userSchema.js";

export const incrementVisitorRepo = async () => {
  // $inc + upsert is atomic, so simultaneous visitors are all counted
  return await Stats.findOneAndUpdate(
    { key: "visitors" },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
};

export const getPublicStatsRepo = async () => {
  const [visitorDoc, totalRequests, completedRequests, registeredCustomers] =
    await Promise.all([
      Stats.findOne({ key: "visitors" }),
      Request.countDocuments(),
      Request.countDocuments({ status: "Completed" }),
      User.countDocuments({ role: "User" }),
    ]);

  return {
    totalVisitors: visitorDoc?.count || 0,
    registeredCustomers,
    totalRequests,
    completedRequests,
  };
};