import { useState, useCallback } from "react";
import type { CandidateResult } from "../types";
import { analyzeResumes } from "../services/api";

export function useAnalysis() {
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CandidateResult[] | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      const unique = newFiles.filter((f) => !existing.has(f.name));
      return [...prev, ...unique];
    });
    setError(null);
  }, []);

  const removeFile = useCallback((fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setJobDescription("");
    setResults(null);
    setError(null);
    setAnalysisId(null);
  }, []);

  const analyze = useCallback(async () => {
    if (files.length === 0) {
      setError("Please upload at least one resume");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const response = await analyzeResumes(files, jobDescription);
      setResults(response.data);
      setAnalysisId(response.analysisId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  }, [files, jobDescription]);

  return {
    files,
    jobDescription,
    isAnalyzing,
    error,
    results,
    analysisId,
    addFiles,
    removeFile,
    clearAll,
    setJobDescription,
    analyze,
  };
}
