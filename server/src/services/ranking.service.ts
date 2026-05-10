import type { ScoredCandidate } from "../types/index.js";

export function rankCandidates(candidates: ScoredCandidate[]): ScoredCandidate[] {
  const sorted = [...candidates].sort(
    (a, b) => b.normalizedScore - a.normalizedScore
  );

  return sorted.map((candidate, index) => ({
    ...candidate,
    rank: index + 1,
  }));
}
