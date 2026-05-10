import "dotenv/config";

import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { connectDatabase } from "./services/db.service.js";

const port = Number(process.env.PORT) || 8000;

connectDatabase().catch(console.error);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
