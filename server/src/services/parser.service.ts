import type { ParsedResume } from "../types/index.js";
import { parsePdf } from "../parsers/pdf.parser.js";
import { parseDocx } from "../parsers/docx.parser.js";

export async function parseResumes(files: File[]): Promise<ParsedResume[]> {
  const results = await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileType = detectFileType(file.name);

      let text: string;
      if (fileType === "pdf") {
        text = await parsePdf(buffer);
      } else {
        text = await parseDocx(buffer);
      }

      return {
        fileName: file.name,
        text,
        fileType,
      };
    })
  );

  return results.filter((r) => r.text.length > 0);
}

function detectFileType(fileName: string): "pdf" | "docx" {
  const ext = fileName.toLowerCase().split(".").pop();
  return ext === "pdf" ? "pdf" : "docx";
}
