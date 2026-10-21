import { describe, expect, it } from 'vitest';
import chapters from '../_data/chapters.js';
import contentData from '../contents/contents.11tydata.js';

describe('PDF metadata from the table of contents', () => {
  it('maps chapter introductions and sections to the existing PDF filenames', () => {
    for (const chapter of chapters()) {
      const number = String(chapter.chapterNumber).padStart(2, '0');
      const metadata = file =>
        contentData.eleventyComputed.pdfDownload({
          chapters: [chapter],
          page: { filePathStem: `/${file.replace(/\.md$/, '')}` },
        });
      expect(metadata(chapter.chapterFile).path).toBe(`/assets/pdf/chapter-${number}-complete.pdf`);
      for (const section of chapter.sections) {
        expect(metadata(section.sectionFile)).toEqual({
          path: `/assets/pdf/chapter-${number}-section-${String(section.sectionNumber).padStart(2, '0')}.pdf`,
          title: `Download Section ${section.sectionNumber}: ${section.sectionTitle}`,
        });
      }
    }
  });
});
