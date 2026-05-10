import mammoth from "mammoth";

export async function parseDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return cleanText(result.value);
}

function cleanText(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s{2,}/g, " ")
    .trim();
}
