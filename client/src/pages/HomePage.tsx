import { motion } from "framer-motion";
import { useAnalysis } from "../hooks/useAnalysis";
import { useSort } from "../hooks/useSort";
import { FileUpload } from "../components/FileUpload";
import { JobDescriptionInput } from "../components/JobDescriptionInput";
import { ResultsDashboard } from "../components/ResultsDashboard";
import { AnalyzingState } from "../components/AnalyzingState";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { Bot, Sparkles, ArrowRight } from "lucide-react";

export function HomePage() {
  const {
    files,
    jobDescription,
    isAnalyzing,
    error,
    results,
    addFiles,
    removeFile,
    clearAll,
    setJobDescription,
    analyze,
  } = useAnalysis();

  const { sorted, sortField, sortOrder, filterText, toggleSort, setFilterText } =
    useSort(results);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Bot className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">ResumeAI</span>
          </div>
          {results && (
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              New Analysis
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12 md:py-20">
        {!results && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Recruitment</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                Hire the perfect match.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                Upload resumes and define your ideal candidate. Our AI instantly surfaces top talent with actionable insights.
              </p>
            </div>

            {error && <ErrorDisplay message={error} onDismiss={() => clearAll()} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 flex flex-col gap-4 overflow-hidden h-[420px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">1. Upload Resumes</h3>
                  <span className="text-sm text-muted-foreground">{files.length}/10 max</span>
                </div>
                <FileUpload
                  files={files}
                  onAddFiles={addFiles}
                  onRemoveFile={removeFile}
                  disabled={isAnalyzing}
                />
              </div>

              <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 flex flex-col gap-4 overflow-hidden h-[420px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">2. Job Description</h3>
                  <span className="text-sm text-muted-foreground">{jobDescription.length} chars</span>
                </div>
                <JobDescriptionInput
                  value={jobDescription}
                  onChange={setJobDescription}
                  disabled={isAnalyzing}
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={analyze}
                disabled={isAnalyzing || files.length === 0 || !jobDescription.trim()}
                className={`
                  inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all w-full md:w-auto md:min-w-[300px]
                  ${files.length > 0 && jobDescription.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                  }
                `}
              >
                Start Analysis
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {isAnalyzing && <AnalyzingState />}

        {results && (
          <ResultsDashboard
            candidates={sorted}
            sortField={sortField}
            sortOrder={sortOrder}
            filterText={filterText}
            onToggleSort={toggleSort}
            onFilterChange={setFilterText}
          />
        )}
      </main>
    </div>
  );
}
