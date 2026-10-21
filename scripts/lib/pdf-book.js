import fs from 'node:fs/promises';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

/** Include front matter and appendices, which the chapter-only summary omits. */
export function bookFiles(markdown) {
  return [...markdown.matchAll(/^\s*\d+\.\s*\[[^\n]+?\]\(([^)]+\.md)\)/gm)].map(match => match[1]);
}

/** Assemble rendered sections in TOC order, with continuous book page numbers. */
export async function assembleBook(sources, render, outputPath) {
  const book = await PDFDocument.create();
  book.setTitle('General Physics - Complete Book');
  const sections = [];

  for (const [index, url] of sources.entries()) {
    const { bytes, ...details } = await render(url, index);
    const section = await PDFDocument.load(bytes);
    if (section.getPageCount() === 0) {
      throw new Error(`Empty PDF for ${url}`);
    }
    const firstPage = book.getPageCount() + 1;
    const pages = await book.copyPages(section, section.getPageIndices());
    for (const page of pages) book.addPage(page);
    sections.push({ url, firstPage, pageCount: pages.length, ...details });
  }

  if (!sections.length) throw new Error('No book sections to generate');
  const font = await book.embedFont(StandardFonts.Helvetica);
  const pages = book.getPages();
  for (const [index, page] of pages.entries()) {
    const label = `Page ${index + 1} of ${pages.length}`;
    page.drawText(label, {
      x: (page.getWidth() - font.widthOfTextAtSize(label, 9)) / 2,
      y: 24,
      size: 9,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });
  }

  // Publish only after every source has rendered and the PDF has been saved.
  const temporaryPath = `${outputPath}.tmp`;
  try {
    await fs.writeFile(temporaryPath, await book.save());
    await fs.rename(temporaryPath, outputPath);
  } finally {
    await fs.rm(temporaryPath, { force: true });
  }
  return { pageCount: pages.length, sourceCount: sections.length, sections };
}
