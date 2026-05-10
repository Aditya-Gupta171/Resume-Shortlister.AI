import { Hono } from "hono";
import { getAnalysisHistory, getAnalysisById } from "../services/db.service.js";

const historyRoutes = new Hono();

historyRoutes.get("/history", async (c) => {
  const analyses = await getAnalysisHistory();
  return c.json({ success: true, data: analyses });
});

historyRoutes.get("/history/:id", async (c) => {
  const id = c.req.param("id");
  const analysis = await getAnalysisById(id);

  if (!analysis) {
    return c.json({ error: "Analysis not found" }, 404);
  }

  return c.json({ success: true, data: analysis });
});

export { historyRoutes };
