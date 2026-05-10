import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  score: { type: Number, required: true },
  normalizedScore: { type: Number, required: true },
  rank: { type: Number, required: true },
  matchingSkills: [String],
  missingSkills: [String],
  goodPoints: [String],
  badPoints: [String],
  summary: { type: String, required: true },
});

const analysisSchema = new mongoose.Schema({
  jobDescription: { type: String, required: true },
  candidates: [candidateSchema],
  totalResumes: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Analysis = mongoose.model("Analysis", analysisSchema);
