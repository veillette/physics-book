import { describe, it, expect, beforeEach } from 'vitest';
import path from 'path';
import { fileURLToPath } from 'url';
import OrphanFileFinder from '../scripts/check-orphans.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('OrphanFileFinder', () => {
  let finder;

  beforeEach(() => {
    finder = new OrphanFileFinder({
      baseDir: path.join(__dirname, '..'),
    });
  });

  describe('isLocalFile', () => {
    it('should return false for http URLs', () => {
      expect(finder.isLocalFile('http://example.com')).toBe(false);
    });

    it('should return false for https URLs', () => {
      expect(finder.isLocalFile('https://example.com/page')).toBe(false);
    });

    it('should return false for mailto links', () => {
      expect(finder.isLocalFile('mailto:user@example.com')).toBe(false);
    });

    it('should return false for tel links', () => {
      expect(finder.isLocalFile('tel:+1234567890')).toBe(false);
    });

    it('should return false for anchor links', () => {
      expect(finder.isLocalFile('#section')).toBe(false);
    });

    it('should return false for javascript URLs', () => {
      expect(finder.isLocalFile('javascript:void(0)')).toBe(false);
    });

    it('should return false for data URLs', () => {
      expect(finder.isLocalFile('data:image/png;base64,abc')).toBe(false);
    });

    it('should return true for relative paths', () => {
      expect(finder.isLocalFile('./image.png')).toBe(true);
      expect(finder.isLocalFile('../image.png')).toBe(true);
    });

    it('should return true for absolute paths', () => {
      expect(finder.isLocalFile('/assets/image.png')).toBe(true);
    });

    it('should return true for simple filenames', () => {
      expect(finder.isLocalFile('image.png')).toBe(true);
    });
  });

  describe('resolvePath', () => {
    it('should resolve relative paths starting with ./', () => {
      const resolved = finder.resolvePath('./image.png', 'contents/chapter1.md');
      expect(resolved).toBe('contents/image.png');
    });

    it('should resolve relative paths starting with ../', () => {
      const resolved = finder.resolvePath('../resources/image.png', 'contents/chapter1.md');
      expect(resolved).toBe('resources/image.png');
    });

    it('should resolve absolute paths from root', () => {
      const resolved = finder.resolvePath('/assets/image.png', 'contents/chapter1.md');
      expect(resolved).toBe('assets/image.png');
    });

    it('should strip GitHub Pages base path', () => {
      // The script strips any /repo-name/ prefix from absolute paths
      const resolved = finder.resolvePath('/my-repo/assets/icon.png', 'contents/ch1.md');
      expect(resolved).toBe('assets/icon.png');
    });

    it('should handle paths without leading slash', () => {
      const resolved = finder.resolvePath('image.png', 'contents/chapter1.md');
      expect(resolved).toBe('image.png');
    });

    it('should handle deeply nested relative paths', () => {
      const resolved = finder.resolvePath(
        '../../resources/figures/image.png',
        'contents/subdir/chapter1.md'
      );
      expect(resolved).toBe('resources/figures/image.png');
    });
  });

  describe('extractLinksFromContent', () => {
    it('should extract markdown links', () => {
      finder.extractLinksFromContent('[text](./page.md)', 'test.md');
      expect(finder.referencedPaths.has('page.md')).toBe(true);
    });

    it('should extract markdown image references', () => {
      finder.extractLinksFromContent('![alt](./image.png)', 'test.md');
      expect(finder.referencedPaths.has('image.png')).toBe(true);
    });

    it('should extract HTML img src', () => {
      finder.extractLinksFromContent('<img src="./photo.jpg" alt="photo">', 'test.md');
      expect(finder.referencedPaths.has('photo.jpg')).toBe(true);
    });

    it('should extract multiple references', () => {
      const content = `
        [Link](./page.md)
        ![Image](./image.png)
        <img src="./photo.jpg" alt="">
      `;
      finder.extractLinksFromContent(content, 'test.md');

      expect(finder.referencedPaths.has('page.md')).toBe(true);
      expect(finder.referencedPaths.has('image.png')).toBe(true);
      expect(finder.referencedPaths.has('photo.jpg')).toBe(true);
    });

    it('should not extract external URLs', () => {
      finder.extractLinksFromContent('[External](https://example.com)', 'test.md');
      expect(finder.referencedPaths.size).toBe(0);
    });

    it('should extract Jekyll/Liquid relative_url references', () => {
      finder.extractLinksFromContent("{{ '/assets/icon.png' | relative_url }}", 'test.md');
      expect(finder.referencedPaths.has('assets/icon.png')).toBe(true);
    });

    it('should handle images with escaped brackets in alt text', () => {
      finder.extractLinksFromContent('![Alt \\[text\\]](./image.png)', 'test.md');
      expect(finder.referencedPaths.has('image.png')).toBe(true);
    });

    it('should extract HTML link hrefs', () => {
      finder.extractLinksFromContent('<link href="./style.css" rel="stylesheet">', 'test.md');
      expect(finder.referencedPaths.has('style.css')).toBe(true);
    });

    it('should extract script src references', () => {
      finder.extractLinksFromContent('<script src="./script.js"></script>', 'test.md');
      expect(finder.referencedPaths.has('script.js')).toBe(true);
    });
  });

  describe('getFileType', () => {
    it('should identify image types', () => {
      expect(finder.getFileType('photo.jpg')).toBe('Image');
      expect(finder.getFileType('photo.jpeg')).toBe('Image');
      expect(finder.getFileType('photo.png')).toBe('Image');
      expect(finder.getFileType('photo.gif')).toBe('Image');
      expect(finder.getFileType('photo.webp')).toBe('Image');
    });

    it('should identify vector type for SVG', () => {
      expect(finder.getFileType('icon.svg')).toBe('Vector');
    });

    it('should identify stylesheet type', () => {
      expect(finder.getFileType('style.css')).toBe('Stylesheet');
    });

    it('should identify script type', () => {
      expect(finder.getFileType('app.js')).toBe('Script');
    });

    it('should identify data type for JSON', () => {
      expect(finder.getFileType('data.json')).toBe('Data');
    });

    it('should identify markdown type', () => {
      expect(finder.getFileType('readme.md')).toBe('Markdown');
    });

    it('should identify HTML type', () => {
      expect(finder.getFileType('index.html')).toBe('HTML');
      expect(finder.getFileType('page.htm')).toBe('HTML');
    });

    it('should return Unknown for unrecognized types', () => {
      expect(finder.getFileType('file.xyz')).toBe('Unknown');
    });
  });

  describe('formatBytes', () => {
    it('should format bytes correctly', () => {
      expect(finder.formatBytes(0)).toBe('0 Bytes');
      expect(finder.formatBytes(1024)).toBe('1 KB');
      expect(finder.formatBytes(1024 * 1024)).toBe('1 MB');
    });

    it('should handle decimal values', () => {
      expect(finder.formatBytes(1536)).toBe('1.5 KB');
    });
  });

  describe('stats initialization', () => {
    it('should initialize stats to zero', () => {
      expect(finder.stats.totalFiles).toBe(0);
      expect(finder.stats.totalImages).toBe(0);
      expect(finder.stats.orphanFiles).toBe(0);
      expect(finder.stats.orphanImages).toBe(0);
    });
  });
});
