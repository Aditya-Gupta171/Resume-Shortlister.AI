import { useCallback } from "react";
import { UploadCloud, X, FileText, File as FileIcon } from "lucide-react";
import { formatFileSize } from "../utils";

interface FileUploadProps {
  files: File[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (fileName: string) => void;
  disabled: boolean;
}

export function FileUpload({ files, onAddFiles, onRemoveFile, disabled }: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (disabled) return;
      const droppedFiles = Array.from(e.dataTransfer.files).filter(
        (f) =>
          f.type === "application/pdf" ||
          f.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      onAddFiles(droppedFiles);
    },
    [onAddFiles, disabled]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        onAddFiles(Array.from(e.target.files));
        e.target.value = "";
      }
    },
    [onAddFiles]
  );

  return (
    <div className="flex flex-col flex-1 gap-4 min-h-0">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center
          transition-colors group flex-1 min-h-0
          ${disabled
            ? "border-muted bg-muted/30 cursor-not-allowed opacity-60"
            : "border-muted-foreground/20 hover:border-primary hover:bg-muted/50 cursor-pointer"
          }
        `}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.docx"
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />
        
        <div className="w-12 h-12 mb-4 rounded-full bg-muted flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
          <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
        </div>
        
        <p className="text-foreground font-medium mb-1">
          Click or drag files here
        </p>
        <p className="text-muted-foreground text-sm">
          Supports .pdf and .docx
        </p>
      </div>

      {files.length > 0 && (
        <div className="bg-muted/30 rounded-lg border p-3 shrink-0">
          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-2.5 bg-background rounded-md border text-sm group/file"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {file.name.endsWith(".pdf") ? (
                    <FileIcon className="w-4 h-4 text-destructive shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFile(file.name)}
                  disabled={disabled}
                  className="text-muted-foreground hover:text-destructive p-1 rounded-md transition-colors z-20 relative opacity-0 group-hover/file:opacity-100 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
