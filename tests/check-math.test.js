import { describe, it, expect } from 'vitest';
import { countDelimiters } from '../scripts/check-math.js';

describe('check-math', () => {
  describe('countDelimiters', () => {
    it('should count single unescaped $ delimiter', () => {
      expect(countDelimiters('The cost is $5')).toBe(1);
    });

    it('should count paired $ delimiters', () => {
      expect(countDelimiters('The equation is $x = 5$')).toBe(2);
    });

    it('should count multiple paired delimiters', () => {
      expect(countDelimiters('$a$ and $b$ are variables')).toBe(4);
    });

    it('should ignore escaped $ delimiters', () => {
      expect(countDelimiters('The cost is \\$5')).toBe(0);
    });

    it('should handle mixed escaped and unescaped delimiters', () => {
      expect(countDelimiters('$x$ costs \\$5')).toBe(2);
    });

    it('should return 0 for empty line', () => {
      expect(countDelimiters('')).toBe(0);
    });

    it('should return 0 for line without delimiters', () => {
      expect(countDelimiters('This is a normal line of text')).toBe(0);
    });

    it('should handle consecutive delimiters', () => {
      expect(countDelimiters('$$x^2$$')).toBe(4);
    });

    it('should handle delimiter at start of line', () => {
      expect(countDelimiters('$x = 5$')).toBe(2);
    });

    it('should handle delimiter at end of line', () => {
      expect(countDelimiters('The variable is $x$')).toBe(2);
    });

    it('should identify unbalanced delimiters (odd count)', () => {
      const line = 'The cost is approximately $2.3';
      const count = countDelimiters(line);
      expect(count % 2).toBe(1); // Odd number means unbalanced
    });

    it('should handle multiple escaped characters', () => {
      expect(countDelimiters('\\$5 and \\$10')).toBe(0);
    });

    it('should handle backslash before non-$ character', () => {
      // Backslash followed by 'n', then $
      expect(countDelimiters('\\n$x$')).toBe(2);
    });

    it('should handle display math delimiters $$', () => {
      expect(countDelimiters('$$\\frac{a}{b}$$')).toBe(4);
    });
  });

  describe('delimiter balance detection', () => {
    it('should detect balanced inline math', () => {
      const balanced = countDelimiters('$x + y = z$');
      expect(balanced % 2).toBe(0);
    });

    it('should detect unbalanced inline math', () => {
      const unbalanced = countDelimiters('$x + y = z');
      expect(unbalanced % 2).toBe(1);
    });

    it('should detect balanced display math', () => {
      const balanced = countDelimiters('$$\\sum_{i=1}^n i$$');
      expect(balanced % 2).toBe(0);
    });

    it('should detect unbalanced display math', () => {
      const unbalanced = countDelimiters('$$\\sum_{i=1}^n i$');
      expect(unbalanced % 2).toBe(1);
    });
  });
});
