import express from "express";
import { getDashboardStatsHandler } from "../controllers/dashBoardController.js";

const dashBoardRouter = express.Router();

dashBoardRouter.get('/stats', getDashboardStatsHandler);

export default dashBoardRouter;