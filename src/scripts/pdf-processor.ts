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

export interface ReadabilityScore {
  readingEase: number;
  gradeLevel: number;
  readingLevelLabel: string;
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
  readability: ReadabilityScore;
  pages: PageMetric[];
}

export interface BatchAnalysisResult {
  files: PDFAnalysisResult[];
  totalFiles: number;
  grandTotalWords: number;
  grandTotalPages: number;
  grandTotalCharacters: number;
  grandTotalReadingTimeMinutes: number;
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

  let fullExtractedText = "";

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
    if (cleanText.length > 0) {
      fullExtractedText += cleanText + " ";
    }

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

  // Readability calculation
  const readability = calculateReadability(fullExtractedText, totalWords);

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
    readability,
    pages,
  };
}

/**
 * Calculates Flesch Reading Ease and Flesch-Kincaid Grade Level entirely in-browser.
 */
export function calculateReadability(text: string, totalWords: number): ReadabilityScore {
  if (totalWords < 20 || !text.trim()) {
    return { readingEase: 0, gradeLevel: 0, readingLevelLabel: "N/A" };
  }

  // Count sentences by end marks
  const sentences = Math.max(1, text.split(/[.!?]+(?:\s+|$)/).filter((s) => s.trim().length > 0).length);

  // Approximate syllables based on vowel groups
  const words = text.toLowerCase().match(/\b[a-z']+\b/g) || [];
  let totalSyllables = 0;
  for (const word of words) {
    let clean = word.replace(/(?:[^laeiouy]|ed|es|e)$/, "");
    let matches = clean.match(/[aeiouy]{1,2}/g);
    let count = matches ? matches.length : 1;
    totalSyllables += Math.max(1, count);
  }

  const effectiveWords = words.length || totalWords;
  const asl = effectiveWords / sentences; // Average Sentence Length
  const asw = totalSyllables / effectiveWords; // Average Syllables per Word

  // Flesch Reading Ease
  let ease = 206.835 - 1.015 * asl - 84.6 * asw;
  ease = Math.max(0, Math.min(100, Math.round(ease)));

  // Flesch-Kincaid Grade Level
  let grade = 0.39 * asl + 11.8 * asw - 15.59;
  grade = Math.max(1, Math.min(18, Math.round(grade * 10) / 10));

  let label = "Standard";
  if (ease >= 90) label = "Very Easy (5th Grade)";
  else if (ease >= 80) label = "Easy (6th Grade)";
  else if (ease >= 70) label = "Fairly Easy (7th Grade)";
  else if (ease >= 60) label = "Standard (8th-9th Grade)";
  else if (ease >= 50) label = "Fairly Difficult (10th-12th Grade)";
  else if (ease >= 30) label = "Difficult (College Level)";
  else label = "Very Difficult (Graduate / Technical)";

  return { readingEase: ease, gradeLevel: grade, readingLevelLabel: label };
}

/**
 * Processes multiple PDF files sequentially in memory.
 */
export async function analyzeMultiplePDFs(
  files: File[],
  onFileProgress?: (fileIndex: number, current: number, total: number) => void
): Promise<BatchAnalysisResult> {
  const results: PDFAnalysisResult[] = [];
  let grandTotalWords = 0;
  let grandTotalPages = 0;
  let grandTotalCharacters = 0;
  let grandTotalReadingTimeMinutes = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const res = await analyzePDF(file, (curr, tot) => {
      if (onFileProgress) onFileProgress(i, curr, tot);
    });
    results.push(res);
    grandTotalWords += res.totalWords;
    grandTotalPages += res.totalPages;
    grandTotalCharacters += res.totalCharacters;
    grandTotalReadingTimeMinutes += res.estimatedReadingTimeMinutes;
  }

  return {
    files: results,
    totalFiles: files.length,
    grandTotalWords,
    grandTotalPages,
    grandTotalCharacters,
    grandTotalReadingTimeMinutes,
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
    ["Readability Score", `"${result.readability?.readingEase ?? 'N/A'} / 100 (${result.readability?.readingLevelLabel ?? 'N/A'})"`],
    ["Grade Level", `"${result.readability?.gradeLevel ?? 'N/A'}"`],
    ["Document Type", result.isScannedOrImageOnly ? "Scanned/Image Document (OCR Needed)" : "Digital Text Document"],
    [],
    headers,
    ...rows,
  ];

  return summary.map((row) => row.join(",")).join("\n");
}
