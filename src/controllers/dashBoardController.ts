import type { Request, Response } from "express";
import { getDashboardStats } from "../db/queries/dashBoardQueries.js";

const getDashboardStatsHandler = async (req: Request, res: Response) => {
  const { error, stats } = await getDashboardStats();

  if (error) {
    res.status(500).json({ error });
  }

  res.json({
    status: "success",
    data: stats,
  });
};

export { getDashboardStatsHandler };