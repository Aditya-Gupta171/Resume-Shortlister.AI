import pdfParse from "pdf-parse";

export async function parsePdf(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return cleanText(data.text);
}

function cleanText(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s{2,}/g, " ")
    .trim();
}
