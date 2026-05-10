const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILE_COUNT = 10;

export function validateFiles(files: File[]): string | null {
  if (files.length > MAX_FILE_COUNT) {
    return `Maximum ${MAX_FILE_COUNT} files allowed`;
  }

  for (const file of files) {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return `Invalid file type: ${file.name}. Only PDF and DOCX are supported`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return `File too large: ${file.name}. Maximum size is 5MB`;
    }

    if (file.size === 0) {
      return `Empty file detected: ${file.name}`;
    }
  }

  return null;
}
