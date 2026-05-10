interface ErrorDisplayProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorDisplay({ message, onDismiss }: ErrorDisplayProps) {
  return (
    <div className="bg-danger/10 border border-danger/20 rounded-2xl p-4 flex items-start gap-3 animate-in">
      <svg className="w-5 h-5 text-danger shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-danger font-medium">Analysis Error</p>
        <p className="text-sm text-surface-200 mt-0.5">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-surface-300 hover:text-surface-100 transition-colors shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
