import { describe, it, expect } from 'vitest';
import { countDelimiters } from '../scripts/check-math.js';

describe('check-math', () => {
  describe('countDelimiters', () => {
    it('should NOT count currency amounts as delimiters', () => {
      expect(countDelimiters('The cost is $5')).toBe(0);
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

    it('should NOT flag currency amounts as unbalanced', () => {
      const line = 'The cost is approximately $2.37';
      const count = countDelimiters(line);
      expect(count % 2).toBe(0); // Currency is ignored, so count is 0 (even)
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

  describe('currency detection', () => {
    it('should ignore simple currency amounts', () => {
      expect(countDelimiters('The price is $10')).toBe(0);
    });

    it('should ignore currency with decimals', () => {
      expect(countDelimiters('It costs $19.99')).toBe(0);
    });

    it('should ignore currency with commas', () => {
      expect(countDelimiters('The total is $1,000')).toBe(0);
    });

    it('should ignore currency with commas and decimals', () => {
      expect(countDelimiters('The budget is $1,234.56')).toBe(0);
    });

    it('should ignore currency followed by punctuation', () => {
      expect(countDelimiters('It costs $5.')).toBe(0);
      expect(countDelimiters('The price ($25) is reasonable')).toBe(0);
      expect(countDelimiters('Costs are $10, $20, and $30')).toBe(0);
    });

    it('should still count math delimiters mixed with currency', () => {
      expect(countDelimiters('$x$ costs $5')).toBe(2);
      expect(countDelimiters('The equation $E = mc^2$ costs $100 to print')).toBe(2);
    });

    it('should handle currency at end of sentence', () => {
      expect(countDelimiters('The total cost is $2.37, which is economical.')).toBe(0);
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
