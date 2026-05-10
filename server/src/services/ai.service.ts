import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import type { ParsedResume, AIAnalysisResult } from "../types/index.js";
import { buildAnalysisPrompt } from "../prompts/analysis.prompt.js";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0.1,
  maxTokens: 2048,
});

export async function analyzeResumes(
  resumes: ParsedResume[],
  jobDescription: string
): Promise<AIAnalysisResult[]> {
  const results: AIAnalysisResult[] = [];

  for (const resume of resumes) {
    const result = await analyzeSingleResume(resume, jobDescription);
    results.push(result);
  }

  return results;
}

async function analyzeSingleResume(
  resume: ParsedResume,
  jobDescription: string
): Promise<AIAnalysisResult> {
  const prompt = buildAnalysisPrompt(resume.text, jobDescription);

  const response = await llm.invoke([new HumanMessage(prompt)]);

  const content =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  return parseAIResponse(content, resume.fileName);
}

function parseAIResponse(raw: string, fileName: string): AIAnalysisResult {
  const cleaned = raw
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);

    return {
      candidateName: parsed.candidateName || "Unknown Candidate",
      score: clampScore(parsed.score),
      matchingSkills: ensureArray(parsed.matchingSkills),
      missingSkills: ensureArray(parsed.missingSkills),
      goodPoints: ensureArray(parsed.goodPoints),
      badPoints: ensureArray(parsed.badPoints),
      summary: parsed.summary || "Analysis could not generate a summary.",
    };
  } catch {
    return {
      candidateName: extractNameFromFileName(fileName),
      score: 0,
      matchingSkills: [],
      missingSkills: [],
      goodPoints: [],
      badPoints: ["AI analysis failed to parse for this resume"],
      summary: "Analysis failed. The AI response was malformed.",
    };
  }
}

function clampScore(score: unknown): number {
  const num = Number(score);
  if (isNaN(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function ensureArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  return [];
}

function extractNameFromFileName(fileName: string): string {
  return fileName
    .replace(/\.(pdf|docx)$/i, "")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
