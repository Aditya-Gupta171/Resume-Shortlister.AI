import type {
  AnalysisResponse,
  AnalysisHistoryItem,
  CandidateResult,
} from "../types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

export async function analyzeResumes(
  files: File[],
  jobDescription: string,
): Promise<AnalysisResponse> {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  files.forEach((file) => formData.append("files[]", file));

  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `Server error: ${response.status}`);
  }

  return response.json();
}

export async function fetchHistory(): Promise<AnalysisHistoryItem[]> {
  const response = await fetch(`${API_BASE}/history`);

  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  const data = await response.json();
  return data.data;
}

export async function fetchAnalysisById(id: string): Promise<{
  jobDescription: string;
  candidates: CandidateResult[];
  totalResumes: number;
  createdAt: string;
}> {
  const response = await fetch(`${API_BASE}/history/${id}`);

  if (!response.ok) {
    throw new Error("Analysis not found");
  }

  const data = await response.json();
  return data.data;
}
