/**
 * Shared unit spacing detection and fixing utilities.
 */

import { UNITS } from './constants.js';
import { isImageLine, hasLatexCommands } from './parser.js';

/**
 * Escape a string so it can be safely used inside a RegExp pattern.
 */
export function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const UNITS_WITHOUT_DEGREE = UNITS.filter(u => u !== '°' && u !== 'deg');

/**
 * Build a regex that matches a number immediately followed by a unit (no space).
 */
export function buildUnitSpacingPattern() {
  return new RegExp(
    `(\\d+(?:\\.\\d+)?)(${UNITS_WITHOUT_DEGREE.map(escapeRegExp).join('|')})(?!\\w)`,
    'g'
  );
}

/**
 * Return true when a number+unit match is a known false positive.
 */
export function isUnitSpacingFalsePositive(text, matchIndex, number, unit) {
  const before = text.substring(Math.max(0, matchIndex - 10), matchIndex);
  if (before.match(/Figure\s+\d+$/i) || before.match(/\d{4}-\d{2}-$/)) {
    return true;
  }
  if (before.match(/ch\d+$/i) || before.match(/section\s*\d+$/i)) {
    return true;
  }

  if (text.includes('<table') || text.includes('<td') || text.includes('<th')) {
    return true;
  }

  const contextStart = Math.max(0, matchIndex - 30);
  const contextEnd = Math.min(text.length, matchIndex + number.length + unit.length + 30);
  const context = text.substring(contextStart, contextEnd);

  if (unit === 's') {
    // Decades and age ranges: 1950s, 1970s, early 20s
    if (/^\d{4}s$/.test(number + unit)) {
      return true;
    }
    if (
      /^\d{2}s$/.test(number + unit) &&
      /(?:early|mid|late|since|in|during|the)\s/i.test(context)
    ) {
      return true;
    }
    // Electron orbital notation: 4s, 3p, etc.
    if (/^\d+s$/.test(number + unit) && /orbital|\(\d+[spdf]\)|\bl\s*=\s*\d+/i.test(context)) {
      return true;
    }
  }

  if (unit === 'g') {
    const value = parseFloat(number);
    // Multiples of g (g-force) are commonly written without a space: 7g, 3.73g
    if (value >= 1 || number.includes('.')) {
      return true;
    }
  }

  if (unit === 'H' || unit === 'T') {
    // Coin-flip notation: 45H/55T, 51H/49T
    if (/\d+H\/\d+T|\d+T\/\d+H/.test(context)) {
      return true;
    }
  }

  if (unit === 'A') {
    // Supernova designations: 1987A
    if (/^\d{4}A$/.test(number + unit)) {
      return true;
    }
  }

  if (unit === 'L') {
    // Standing-wave harmonic notation: 3L, 5L (L = wavelength), not liters
    if (
      /harmonic|resonance|closed pipe|open pipe|wavelength|\(L,\s*\d+L|odd multiples/i.test(context)
    ) {
      return true;
    }
  }

  if (unit === 'h') {
    // Height variable h immediately after a number in explanatory text
    if (/height\s+h\b/i.test(context)) {
      return true;
    }
  }

  if (unit === 'Ω' && number === '1' && text.includes('V/A')) {
    return true;
  }

  return false;
}

/**
 * Find unit spacing issues in a line of text.
 */
export function findUnitSpacingIssues(text) {
  if (isImageLine(text)) return [];
  if (hasLatexCommands(text)) return [];
  if (text.includes('$')) return [];

  const pattern = buildUnitSpacingPattern();
  const issues = [];
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (isUnitSpacingFalsePositive(text, match.index, match[1], match[2])) {
      continue;
    }

    issues.push({
      match: match[0],
      number: match[1],
      unit: match[2],
      index: match.index,
    });
  }

  return issues;
}

/**
 * Insert spaces between numbers and units in plain text segments.
 */
export function fixUnitSpacingInText(text) {
  if (isImageLine(text)) return text;
  if (hasLatexCommands(text)) return text;

  const parts = text.split(/(\$\$[^$]*\$\$|\$[^$]+\$)/);

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] && (parts[i].startsWith('$$') || parts[i].startsWith('$'))) {
      continue;
    }

    if (!parts[i]) continue;

    const pattern = buildUnitSpacingPattern();
    parts[i] = parts[i].replace(pattern, (fullMatch, number, unit, offset) => {
      if (isUnitSpacingFalsePositive(parts[i], offset, number, unit)) {
        return fullMatch;
      }
      return `${number} ${unit}`;
    });
  }

  return parts.join('');
}
