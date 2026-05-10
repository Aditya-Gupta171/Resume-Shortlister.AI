import { motion } from "framer-motion";
import { Users, Award, Star, Search, ArrowUpDown } from "lucide-react";
import type { CandidateResult, SortField, SortOrder } from "../types";
import { CandidateCard } from "./CandidateCard";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ResultsDashboardProps {
  candidates: CandidateResult[];
  sortField: SortField;
  sortOrder: SortOrder;
  filterText: string;
  onToggleSort: (field: SortField) => void;
  onFilterChange: (text: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function ResultsDashboard({
  candidates,
  sortField,
  sortOrder,
  filterText,
  onToggleSort,
  onFilterChange,
}: ResultsDashboardProps) {
  const avgScore =
    candidates.length > 0
      ? Math.round(
          candidates.reduce((sum, c) => sum + c.normalizedScore, 0) / candidates.length
        )
      : 0;

  const topCandidates = candidates.filter((c) => c.normalizedScore >= 70).length;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 mt-16 w-full max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Analyzed</p>
                <p className="text-3xl font-bold">{candidates.length}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Average Score</p>
                <p className="text-3xl font-bold">{avgScore}<span className="text-sm text-muted-foreground ml-1">/100</span></p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Strong Matches</p>
                <p className="text-3xl font-bold">{topCandidates}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item} className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {(["rank", "normalizedScore", "candidateName"] as SortField[]).map((field) => (
            <Button
              key={field}
              variant={sortField === field ? "default" : "outline"}
              onClick={() => onToggleSort(field)}
              className="gap-2"
            >
              {field === "rank" ? "Rank" : field === "normalizedScore" ? "Score" : "Name"}
              {sortField === field && (
                <ArrowUpDown className={`w-4 h-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
              )}
            </Button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Search className="w-4 h-4" />
          </div>
          <Input
            type="text"
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Search candidates..."
            className="pl-9 bg-background"
          />
        </div>
      </motion.div>

      <div className="space-y-4">
        {candidates.length === 0 ? (
          <motion.div variants={item} className="text-center py-20 px-6 bg-muted/30 rounded-xl border border-dashed">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No matches found</h3>
            <p className="text-muted-foreground">Try adjusting your search filter</p>
          </motion.div>
        ) : (
          candidates.map((candidate, index) => (
            <CandidateCard key={candidate.rank} candidate={candidate} index={index} />
          ))
        )}
      </div>
    </motion.div>
  );
}
