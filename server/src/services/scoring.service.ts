import type { AIAnalysisResult, ScoredCandidate } from "../types/index.js";

export function calculateScores(
  results: AIAnalysisResult[]
): ScoredCandidate[] {
  return results.map((result) => {
    // The LLM provides a holistic score out of 100 based on skills, experience, projects, and education.
    // We will use the LLM's score as the base, and apply minor mathematical adjustments 
    // based on the raw count of matching/missing skills to ensure consistency.
    
    let baseScore = result.score;
    
    // Fallback if LLM failed to provide a valid score
    if (baseScore === 0 && result.matchingSkills.length > 0) {
       const skillsRatio = result.matchingSkills.length / Math.max(result.matchingSkills.length + result.missingSkills.length, 1);
       baseScore = skillsRatio * 100;
    }

    // Optional: minor tweak to reward high skill match ratio
    const totalSkills = result.matchingSkills.length + result.missingSkills.length;
    let adjustedScore = baseScore;
    
    if (totalSkills > 0) {
      const skillsRatio = result.matchingSkills.length / totalSkills;
      // If skills ratio is very high (>80%), give a small bump. If very low (<20%), small penalty.
      if (skillsRatio > 0.8) {
        adjustedScore += 5;
      } else if (skillsRatio < 0.2) {
        adjustedScore -= 5;
      }
    }

    // Ensure score stays within 0-100 bounds
    const finalScore = Math.max(0, Math.min(100, Math.round(adjustedScore)));

    return {
      ...result,
      normalizedScore: finalScore,
      rank: 0,
    };
  });
}
