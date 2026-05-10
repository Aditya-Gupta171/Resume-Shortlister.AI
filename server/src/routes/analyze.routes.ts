import { Hono } from "hono";
import { analyzeController } from "../controllers/analyze.controller.js";

const analyzeRoutes = new Hono();

analyzeRoutes.post("/analyze", analyzeController);

export { analyzeRoutes };
