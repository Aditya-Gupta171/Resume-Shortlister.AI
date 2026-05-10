import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, AlertTriangle, Target } from "lucide-react";
import type { CandidateResult } from "../types";
import { getScoreLabel } from "../utils";
import { Card } from "./ui/card";

interface CandidateCardProps {
  candidate: CandidateResult;
  index: number;
}

export function CandidateCard({ candidate, index }: CandidateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isExcellent = candidate.normalizedScore >= 80;
  const isGood = candidate.normalizedScore >= 60;
  
  const scoreColor = isExcellent ? "text-emerald-500" : isGood ? "text-amber-500" : "text-destructive";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <div
          className="p-6 cursor-pointer hover:bg-muted/30 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-5 min-w-0">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 bg-muted/50 border ${scoreColor}`}>
                #{candidate.rank}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate text-xl">
                  {candidate.candidateName}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 font-medium flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isExcellent ? "bg-emerald-500" : isGood ? "bg-amber-500" : "bg-destructive"}`} />
                  {getScoreLabel(candidate.normalizedScore)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <div className="text-right">
                <div className="flex items-baseline gap-1 justify-end">
                  <p className={`text-3xl font-bold tracking-tight ${scoreColor}`}>
                    {candidate.normalizedScore}
                  </p>
                  <span className="text-muted-foreground font-medium text-sm">/100</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Overall Score</p>
              </div>
              <div className="p-2">
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {candidate.matchingSkills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
              >
                {skill}
              </span>
            ))}
            {candidate.matchingSkills.length > 6 && (
              <span className="px-2.5 py-1 text-xs font-medium text-muted-foreground rounded-md bg-muted border">
                +{candidate.matchingSkills.length - 6} more
              </span>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="border-t bg-muted/10"
            >
              <div className="p-6 space-y-6">
                <div className="p-4 rounded-xl bg-background border shadow-sm">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" /> AI Executive Summary
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">{candidate.summary}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3 bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/10">
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Key Strengths
                    </h4>
                    <ul className="space-y-2.5">
                      {candidate.goodPoints.map((point, i) => (
                        <li key={i} className="text-sm text-foreground flex items-start gap-3 leading-relaxed">
                          <span className="text-emerald-500 mt-1 shrink-0">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 bg-destructive/5 p-5 rounded-xl border border-destructive/10">
                    <h4 className="text-xs font-bold text-destructive uppercase tracking-widest flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Areas of Concern
                    </h4>
                    <ul className="space-y-2.5">
                      {candidate.badPoints.map((point, i) => (
                        <li key={i} className="text-sm text-foreground flex items-start gap-3 leading-relaxed">
                          <span className="text-destructive mt-1 shrink-0">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">Matching Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.matchingSkills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Missing Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.missingSkills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 text-xs font-medium rounded-md bg-destructive/10 text-destructive border border-destructive/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
