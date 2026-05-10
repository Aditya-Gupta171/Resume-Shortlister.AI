export interface CandidateResult {
  candidateName: string;
  score: number;
  normalizedScore: number;
  rank: number;
  matchingSkills: string[];
  missingSkills: string[];
  goodPoints: string[];
  badPoints: string[];
  summary: string;
}

export interface AnalysisResponse {
  success: boolean;
  data: CandidateResult[];
  analysisId: string | null;
}

export interface AnalysisHistoryItem {
  _id: string;
  jobDescription: string;
  totalResumes: number;
  createdAt: string;
}

export type SortField = "rank" | "normalizedScore" | "candidateName";
export type SortOrder = "asc" | "desc";

export interface UploadState {
  files: File[];
  jobDescription: string;
  isAnalyzing: boolean;
  error: string | null;
  results: CandidateResult[] | null;
}
