import { Loader2 } from "lucide-react";

export function AnalyzingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">
        Analyzing Candidates
      </h3>
      <p className="text-muted-foreground max-w-md text-center">
        Our AI is evaluating resumes against your job description. This may take a few moments depending on the number of files.
      </p>
    </div>
  );
}
