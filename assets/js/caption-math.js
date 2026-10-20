/**
 * Normalize legacy caption math while preserving explicitly delimited equations.
 * Image titles retain source backslashes through the Markdown renderer.
 */
export function normalizeCaptionMath(text) {
  return text
    .replace(/\\\\/g, '\\')
    .replace(
      /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\$[^$]*?\$|\(\s+([^()]+?)\s+\)/g,
      (match, legacyMath) => (legacyMath === undefined ? match : `\\(${legacyMath}\\)`)
    );
}
