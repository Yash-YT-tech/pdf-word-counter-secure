import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Import pure utility functions from compiled or source scripts
import { formatBytes, calculateReadability } from "../src/scripts/pdf-processor.ts";

describe("PDF Processor Utilities", () => {
  test("formatBytes formats data sizes accurately", () => {
    assert.equal(formatBytes(0), "0 B");
    assert.equal(formatBytes(1024), "1 KB");
    assert.equal(formatBytes(1024 * 1024 * 2.5), "2.5 MB");
    assert.equal(formatBytes(1024 * 1024 * 1024 * 1.2), "1.2 GB");
  });

  test("calculateReadability returns N/A for empty or trivial text", () => {
    const emptyResult = calculateReadability("", 0);
    assert.equal(emptyResult.readingLevelLabel, "N/A");
    assert.equal(emptyResult.readingEase, 0);

    const shortResult = calculateReadability("Too short text.", 3);
    assert.equal(shortResult.readingLevelLabel, "N/A");
  });

  test("calculateReadability calculates Flesch score on standard prose", () => {
    const prose = `
      The cat sat on the mat. It was a sunny and bright afternoon in the small village.
      Children played outside near the clear blue stream. Everyone was happy and relaxed.
      The air was warm and sweet with the smell of wild flowers blooming everywhere.
    `;
    const words = prose.trim().split(/\s+/).length;
    const result = calculateReadability(prose, words);

    assert.ok(result.readingEase > 60, `Expected ease > 60, got ${result.readingEase}`);
    assert.ok(result.gradeLevel >= 1 && result.gradeLevel <= 8, `Expected grade 1-8, got ${result.gradeLevel}`);
    assert.ok(typeof result.readingLevelLabel === "string");
  });

  test("calculateReadability handles technical/graduate text properly", () => {
    const technical = `
      The electrochemical impedance spectroscopy measurements demonstrated significant pseudocapacitive charge storage
      characteristics within the hierarchical nanostructured transition metal dichalcogenide electrodes under ambient temperatures.
      Furthermore, thermodynamic investigations revealed irreversible structural phase transformations during cyclic voltammetric oxidation.
    `;
    const words = technical.trim().split(/\s+/).length;
    const result = calculateReadability(technical, words);

    assert.ok(result.readingEase < 50, `Expected ease < 50 for complex text, got ${result.readingEase}`);
    assert.ok(result.gradeLevel >= 10, `Expected high grade level, got ${result.gradeLevel}`);
  });
});

describe("Static Build & Production Output QA", () => {
  const distDir = path.join(projectRoot, "dist");

  test("All 9 production HTML routes exist in dist", () => {
    const expectedRoutes = [
      "index.html",
      "about/index.html",
      "contact/index.html",
      "pdf-page-counter/index.html",
      "pdf-character-counter/index.html",
      "pdf-reading-time/index.html",
      "privacy-policy/index.html",
      "terms/index.html",
      "404.html",
    ];

    for (const route of expectedRoutes) {
      const filePath = path.join(distDir, route);
      assert.ok(fs.existsSync(filePath), `Route missing in dist: ${route}`);
    }
  });

  test("Public assets and headers exist in dist", () => {
    const expectedFiles = [
      "_headers",
      "robots.txt",
      "sitemap-index.xml",
      "sitemap-0.xml",
      "favicon.ico",
      "favicon.svg",
      "apple-touch-icon.png",
      "icon-192.png",
      "icon-512.png",
      "og-image.png",
      "site.webmanifest",
      "pdf.worker.min.mjs",
    ];

    for (const file of expectedFiles) {
      const filePath = path.join(distDir, file);
      assert.ok(fs.existsSync(filePath), `Asset missing in dist: ${file}`);
    }
  });

  test("Duplicate content guard (_headers) has X-Robots-Tag: noindex", () => {
    const headersPath = path.join(distDir, "_headers");
    const content = fs.readFileSync(headersPath, "utf-8");
    assert.ok(content.includes("X-Robots-Tag: noindex"));
    assert.ok(content.includes("pages.dev"));
  });

  test("Homepage HTML contains WebApplication schema & meta tags", () => {
    const indexPath = path.join(distDir, "index.html");
    const html = fs.readFileSync(indexPath, "utf-8");
    assert.ok(html.includes('"@type": "WebApplication"') || html.includes('"@type":"WebApplication"'));
    assert.ok(html.includes('name="description"'));
    assert.ok(html.includes('property="og:image"'));
    assert.ok(html.includes('rel="canonical"'));
  });

  test("All sub-pages contain canonical links and meta titles", () => {
    const subpages = ["pdf-page-counter", "pdf-character-counter", "pdf-reading-time"];
    for (const sub of subpages) {
      const htmlPath = path.join(distDir, sub, "index.html");
      const html = fs.readFileSync(htmlPath, "utf-8");
      assert.ok(html.includes(`<link rel="canonical" href="https://pdfwordcounter.org/${sub}"`));
      assert.ok(html.includes("<title>"));
    }
  });
});
