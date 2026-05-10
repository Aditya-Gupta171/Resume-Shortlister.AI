import type { Context } from "hono";
import { validateFiles } from "../middleware/file-validation.js";
import { parseResumes } from "../services/parser.service.js";
import { analyzeResumes } from "../services/ai.service.js";
import { calculateScores } from "../services/scoring.service.js";
import { rankCandidates } from "../services/ranking.service.js";
import { saveAnalysis } from "../services/db.service.js";

export async function analyzeController(c: Context) {
  const body = await c.req.parseBody({ all: true });

  const jobDescription = body["jobDescription"];
  if (!jobDescription || typeof jobDescription !== "string") {
    return c.json({ error: "Job description is required" }, 400);
  }

  const rawFiles = body["files[]"];
  const files: File[] = Array.isArray(rawFiles)
    ? (rawFiles.filter((f) => f instanceof File) as File[])
    : rawFiles instanceof File
      ? [rawFiles]
      : [];

  if (files.length === 0) {
    return c.json({ error: "At least one resume file is required" }, 400);
  }

  const validationError = validateFiles(files);
  if (validationError) {
    return c.json({ error: validationError }, 400);
  }

  const parsedResumes = await parseResumes(files);

  const aiResults = await analyzeResumes(parsedResumes, jobDescription);

  const scoredResults = calculateScores(aiResults);

  const rankedResults = rankCandidates(scoredResults);

  let analysisId: string | null = null;
  try {
    analysisId = await saveAnalysis(jobDescription, rankedResults);
  } catch (err) {
    console.error("Failed to save analysis:", err);
  }

  return c.json({ success: true, data: rankedResults, analysisId });
}
