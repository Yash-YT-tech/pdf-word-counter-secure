import * as pdfjsLib from "pdfjs-dist";

// Configure client-side worker path
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

export interface PageMetric {
  pageNumber: number;
  wordCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  hasText: boolean;
}

export interface PDFAnalysisResult {
  fileName: string;
  fileSizeBytes: number;
  totalPages: number;
  totalWords: number;
  totalCharacters: number;
  totalCharactersNoSpaces: number;
  estimatedReadingTimeMinutes: number;
  estimatedSpeakingTimeMinutes: number;
  isScannedOrImageOnly: boolean;
  pages: PageMetric[];
}

/**
 * Parses a PDF file entirely within the client's browser memory.
 * No data is transmitted to any external server.
 */
export async function analyzePDF(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<PDFAnalysisResult> {
  const arrayBuffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    useSystemFonts: true,
  });

  const pdfDoc = await loadingTask.promise;
  const totalPages = pdfDoc.numPages;

  const pages: PageMetric[] = [];
  let totalWords = 0;
  let totalCharacters = 0;
  let totalCharactersNoSpaces = 0;
  let blankOrImagePages = 0;

  for (let i = 1; i <= totalPages; i++) {
    if (onProgress) {
      onProgress(i, totalPages);
    }

    const page = await pdfDoc.getPage(i);
    const textContent = await page.getTextContent();

    // Extract text items from page content stream
    const rawText = textContent.items
      .map((item) => ("str" in item ? (item as { str: string }).str : ""))
      .join(" ")
      .trim();

    // Normalize whitespace
    const cleanText = rawText.replace(/\s+/g, " ");

    // Word count calculation
    const words = cleanText.length > 0 ? cleanText.split(" ").filter((w) => w.length > 0) : [];
    const wordCount = words.length;

    // Character metrics
    const characterCount = cleanText.length;
    const characterCountNoSpaces = cleanText.replace(/\s/g, "").length;
    const hasText = wordCount > 0;

    if (!hasText) {
      blankOrImagePages++;
    }

    totalWords += wordCount;
    totalCharacters += characterCount;
    totalCharactersNoSpaces += characterCountNoSpaces;

    pages.push({
      pageNumber: i,
      wordCount,
      characterCount,
      characterCountNoSpaces,
      hasText,
    });
  }

  // Estimated reading speed: 225 words per minute
  const readingMinutes = totalWords > 0 ? Math.max(1, Math.round((totalWords / 225) * 10) / 10) : 0;

  // Estimated speaking speed: 130 words per minute
  const speakingMinutes = totalWords > 0 ? Math.max(1, Math.round((totalWords / 130) * 10) / 10) : 0;

  // Detection of scanned/image-only documents without text layer
  const isScannedOrImageOnly =
    totalPages > 0 &&
    (totalWords === 0 || (blankOrImagePages / totalPages) >= 0.75);

  return {
    fileName: file.name,
    fileSizeBytes: file.size,
    totalPages,
    totalWords,
    totalCharacters,
    totalCharactersNoSpaces,
    estimatedReadingTimeMinutes: readingMinutes,
    estimatedSpeakingTimeMinutes: speakingMinutes,
    isScannedOrImageOnly,
    pages,
  };
}

/**
 * Format raw bytes into human readable KB / MB string
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Generate CSV data from PDF analysis results
 */
export function exportToCSV(result: PDFAnalysisResult): string {
  const headers = ["Page", "Word Count", "Characters (with spaces)", "Characters (no spaces)", "Has Text Layer"];
  const rows = result.pages.map((p) => [
    p.pageNumber,
    p.wordCount,
    p.characterCount,
    p.characterCountNoSpaces,
    p.hasText ? "Yes" : "No",
  ]);

  const summary = [
    ["Document Name", `"${result.fileName}"`],
    ["File Size", `"${formatBytes(result.fileSizeBytes)}"`],
    ["Total Pages", result.totalPages],
    ["Total Words", result.totalWords],
    ["Total Characters (with spaces)", result.totalCharacters],
    ["Total Characters (no spaces)", result.totalCharactersNoSpaces],
    ["Est. Reading Time (min)", result.estimatedReadingTimeMinutes],
    ["Est. Speaking Time (min)", result.estimatedSpeakingTimeMinutes],
    ["Document Type", result.isScannedOrImageOnly ? "Scanned/Image Document (OCR Needed)" : "Digital Text Document"],
    [],
    headers,
    ...rows,
  ];

  return summary.map((row) => row.join(",")).join("\n");
}
