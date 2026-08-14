import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect, beforeEach } from 'vitest';
import LinkChecker from '../scripts/check-links.js';
import { getLineNumber } from '../scripts/lib/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('LinkChecker', () => {
  let checker;

  beforeEach(() => {
    checker = new LinkChecker({
      baseDir: path.join(__dirname, '..'),
    });
  });

  describe('extractLinks', () => {
    it('should extract markdown links', () => {
      const content = 'Check out [Google](https://google.com) for more info.';
      const links = checker.extractLinks(content);

      expect(links).toHaveLength(1);
      expect(links[0].text).toBe('Google');
      expect(links[0].url).toBe('https://google.com');
      expect(links[0].type).toBe('markdown');
    });

    it('should extract markdown links with titles', () => {
      const content = 'See [Docs](./docs.md "Documentation") here.';
      const links = checker.extractLinks(content);

      expect(links).toHaveLength(1);
      expect(links[0].url).toBe('./docs.md');
    });

    it('should extract multiple links', () => {
      const content = `
        [Link1](./page1.md)
        [Link2](./page2.md)
        [External](https://example.com)
      `;
      const links = checker.extractLinks(content);

      expect(links).toHaveLength(3);
    });

    it('should skip anchor-only links', () => {
      const content = 'Jump to [Section](#section-1) below.';
      const links = checker.extractLinks(content);

      expect(links).toHaveLength(0);
    });

    it('should extract image links', () => {
      const content = '![Alt text](./image.png)';
      const links = checker.extractLinks(content);

      // Note: Images are matched by both markdown and image regex patterns
      // The image type link is extracted separately
      const imageLinks = links.filter(l => l.type === 'image');
      expect(imageLinks).toHaveLength(1);
      expect(imageLinks[0].url).toBe('./image.png');
    });

    it('should extract HTML links', () => {
      const content = '<a href="https://example.com">Click here</a>';
      const links = checker.extractLinks(content);

      expect(links).toHaveLength(1);
      expect(links[0].url).toBe('https://example.com');
      expect(links[0].type).toBe('html');
    });

    it('should handle complex markdown with mixed link types', () => {
      const content = `
# Chapter Title

Here is a [reference](./chapter1.md) and an image:

![Figure 1](../resources/Figure_01_01_01.jpg "A figure")

External link: [Wikipedia](https://en.wikipedia.org)

<a href="./index.html">Home</a>
      `;
      const links = checker.extractLinks(content);

      // Note: Images are captured by both markdown and image regex
      // So we get: reference (md), Figure 1 (md), Figure 1 (img), Wikipedia (md), Home (html)
      expect(links).toHaveLength(5);
      expect(links.filter(l => l.type === 'markdown')).toHaveLength(3);
      expect(links.filter(l => l.type === 'image')).toHaveLength(1);
      expect(links.filter(l => l.type === 'html')).toHaveLength(1);
    });
  });

  describe('isExternalLink', () => {
    it('should identify http links as external', () => {
      expect(checker.isExternalLink('http://example.com')).toBe(true);
    });

    it('should identify https links as external', () => {
      expect(checker.isExternalLink('https://example.com')).toBe(true);
    });

    it('should identify relative links as internal', () => {
      expect(checker.isExternalLink('./page.md')).toBe(false);
      expect(checker.isExternalLink('../page.md')).toBe(false);
      expect(checker.isExternalLink('/page.md')).toBe(false);
    });
  });

  describe('getLineNumber', () => {
    it('should return correct line number for single line', () => {
      const content = 'Hello world';
      expect(getLineNumber(content, 0)).toBe(1);
    });

    it('should return correct line number for multiple lines', () => {
      const content = 'Line 1\nLine 2\nLine 3';
      expect(getLineNumber(content, 0)).toBe(1);
      expect(getLineNumber(content, 7)).toBe(2);
      expect(getLineNumber(content, 14)).toBe(3);
    });

    it('should handle empty content', () => {
      expect(getLineNumber('', 0)).toBe(1);
    });
  });

  describe('stats tracking', () => {
    it('should initialize with zero stats', () => {
      expect(checker.stats.totalFiles).toBe(0);
      expect(checker.stats.totalLinks).toBe(0);
      expect(checker.stats.brokenLinks).toBe(0);
    });

    it('should track extracted links count', () => {
      const content = '[Link1](./a.md) [Link2](./b.md)';
      checker.extractLinks(content);

      expect(checker.stats.totalLinks).toBe(2);
    });
  });

  describe('isGitignored', () => {
    it('should detect gitignored paths under /assets/pdf/', () => {
      expect(checker.isGitignored('assets/pdf/chapter-01-complete.pdf')).toBe(true);
    });

    it('should not flag tracked files as gitignored', () => {
      expect(checker.isGitignored('contents/preface.md')).toBe(false);
    });

    it('should cache results across calls', () => {
      checker.isGitignored('assets/pdf/chapter-01-complete.pdf');
      expect(checker._gitignoreCache.has('assets/pdf/chapter-01-complete.pdf')).toBe(true);
    });

    it('should respect the noGitignoreSkip option', () => {
      const strictChecker = new LinkChecker({ noGitignoreSkip: true });
      expect(strictChecker.respectGitignore).toBe(false);
    });
  });

  describe('checkInternalLink — gitignored build artifacts', () => {
    it('should warn (not break) on missing gitignored targets', async () => {
      const link = {
        text: 'PDF',
        url: '/assets/pdf/chapter-99-complete.pdf',
        type: 'markdown',
        line: 1,
      };
      const before = checker.stats.brokenLinks;
      await checker.checkInternalLink(link, 'contents/preface.md');
      expect(checker.stats.brokenLinks).toBe(before);
      expect(checker.stats.skippedLinks).toBeGreaterThan(0);
    });

    it('should break on missing non-gitignored targets', async () => {
      const link = {
        text: 'missing',
        url: '/contents/this-file-does-not-exist.md',
        type: 'markdown',
        line: 1,
      };
      const before = checker.stats.brokenLinks;
      await checker.checkInternalLink(link, 'contents/preface.md');
      expect(checker.stats.brokenLinks).toBe(before + 1);
    });
  });
});
