import express from "express";

import metricsRouter from "./metrics";

export const routes = express.Router();

routes.use("/api/metrics", metricsRouter);
