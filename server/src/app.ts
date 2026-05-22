import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { analyzeRoutes } from "./routes/analyze.routes.js";
import { historyRoutes } from "./routes/history.routes.js";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://resume-shortlister-ai.vercel.app",
    ],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.route("/api", analyzeRoutes);
app.route("/api", historyRoutes);

app.notFound((c) => {
  return c.json({ error: "Route not found" }, 404);
});

app.onError((err, c) => {
  console.error(`Unhandled error: ${err.message}`);
  return c.json({ error: "Internal server error", message: err.message }, 500);
});

export { app };
