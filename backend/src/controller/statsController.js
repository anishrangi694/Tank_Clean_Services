import { countVisitService, getPublicStatsService } from "../service/statsService.js";

export const countVisit = async (req, res) => {
  try {
    await countVisitService();
    res.status(200).json({ message: "visit counted", data: {}, error: {}, success: true });
  } catch (error) {
    console.log("visit not counted", error);
    res.status(500).json({ message: "visit not counted", data: {}, error: {}, success: false });
  }
};

export const getPublicStats = async (req, res) => {
  try {
    const stats = await getPublicStatsService();
    res.status(200).json({ message: "stats fetched", data: stats, error: {}, success: true });
  } catch (error) {
    console.log("stats not fetched", error);
    res.status(500).json({ message: "could not fetch stats", data: {}, error: {}, success: false });
  }
};