export interface ParsedResume {
  fileName: string;
  text: string;
  fileType: "pdf" | "docx";
}

export interface AIAnalysisResult {
  candidateName: string;
  score: number;
  matchingSkills: string[];
  missingSkills: string[];
  goodPoints: string[];
  badPoints: string[];
  summary: string;
}

export interface ScoredCandidate extends AIAnalysisResult {
  normalizedScore: number;
  rank: number;
}

export interface AnalysisResponse {
  success: boolean;
  data: ScoredCandidate[];
}

export interface AnalysisRecord {
  jobDescription: string;
  candidates: ScoredCandidate[];
  totalResumes: number;
  createdAt: Date;
}
