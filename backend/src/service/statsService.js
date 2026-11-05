import { getPublicStatsRepo, incrementVisitorRepo } from "../repository/statsRepo.js";

export const countVisitService = async () => {
  await incrementVisitorRepo();
};

export const getPublicStatsService = async () => {
  return await getPublicStatsRepo();
};