import { Textarea } from "./ui/textarea";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function JobDescriptionInput({ value, onChange, disabled }: JobDescriptionInputProps) {
  return (
    <div className="flex flex-col flex-1 gap-2 min-h-0">
      <Textarea
        id="job-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste the complete job description here. Include required skills, experience level, responsibilities, and qualifications..."
        className="flex-1 resize-none text-base p-4 [field-sizing:fixed]"
      />
      <p className="text-xs text-muted-foreground text-right mt-1 shrink-0">
        {value.length} chars
      </p>
    </div>
  );
}
