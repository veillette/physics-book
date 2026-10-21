// Directory data for contents/*.md — applies to every content page.
// Enforces the output-path contract: contents/x.md -> contents/x.html
// (not contents/x/index.html). Overriding permalink to `<filePathStem>.html` keeps
// every existing URL, anchor, PDF link, and search index entry stable.
export default {
  layout: 'page',
  eleventyComputed: {
    permalink: data => `${data.page.filePathStem}.html`,
    pdfDownload: data => {
      const file = `${data.page.filePathStem.replace(/^\//, '')}.md`;
      const chapter = data.chapters.find(
        ch => ch.chapterFile === file || ch.sections.some(s => s.sectionFile === file)
      );
      if (!chapter) return null;
      const section = chapter.sections.find(s => s.sectionFile === file);
      const number = String(chapter.chapterNumber).padStart(2, '0');
      return {
        path: section
          ? `/assets/pdf/chapter-${number}-section-${String(section.sectionNumber).padStart(2, '0')}.pdf`
          : `/assets/pdf/chapter-${number}-complete.pdf`,
        title: section
          ? `Download Section ${section.sectionNumber}: ${section.sectionTitle}`
          : `Download Chapter ${chapter.chapterNumber} PDF`,
      };
    },
  },
};
