import mongoose from "mongoose";
import { Analysis } from "../models/analysis.model.js";
import type { ScoredCandidate } from "../types/index.js";

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI not set. Database features disabled.");
    return;
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB Atlas");
}

export async function saveAnalysis(
  jobDescription: string,
  candidates: ScoredCandidate[]
): Promise<string> {
  const analysis = new Analysis({
    jobDescription,
    candidates,
    totalResumes: candidates.length,
  });

  const saved = await analysis.save();
  return saved._id.toString();
}

export async function getAnalysisHistory() {
  return Analysis.find()
    .sort({ createdAt: -1 })
    .limit(20)
    .select("jobDescription totalResumes createdAt")
    .lean();
}

export async function getAnalysisById(id: string) {
  return Analysis.findById(id).lean();
}
