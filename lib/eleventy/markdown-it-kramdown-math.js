// markdown-it-kramdown-math.js
// Reproduces Kramdown's math output (with math_engine: null) so the Eleventy build matches
// the original Kramdown output. Verified against kramdown 2.5.1 (parser/kramdown/math.rb,
// converter/html.rb):
//   * only $$…$$ is math; single $, \(, \[ are NOT (Kramdown's escape set collapses \( -> (,
//     matching markdown-it's escape rule, so we leave them alone);
//   * a $$…$$ that is a block by itself  ->  \\[\n{value}\n\\]  (DISPLAY math for MathJax);
//   * a $$…$$ anywhere else (embedded in text, sharing a paragraph with other math, in a
//     heading/table cell, …)  ->  \\({value}\\)  (INLINE math for MathJax);
//   * the value is emitted RAW/unescaped (the baseline really contains raw & and < inside
//     kdmath), and .strip'd. MathJax delimiters (\\(...\\), \\[...\\]) are emitted at render time.
//
// Implementation: one inline rule claims every $$…$$ span (before other rules can mangle
// its backslashes/underscores). A post-inline core rule then promotes a $$…$$ to display
// math iff it is the SOLE content of a paragraph or list item — which is exactly Kramdown's
// "is this math its own block?" test, and is robust where a block-ruler heuristic is not
// (markdown-it does not give a tight per-list-item line range). $$…$$ inside a raw HTML
// block (e.g. <div class="equation">) is consumed verbatim by markdown-it's html_block
// before inline runs, so it never reaches here — matching Kramdown leaving raw HTML alone.
export default function kramdownMath(md) {
  // ---- inline rule: claim $$ … $$ (may span newlines within a block's inline content) ----
  md.inline.ruler.before('escape', 'kdmath', (state, silent) => {
    const src = state.src;
    const pos = state.pos;
    if (src.charCodeAt(pos) !== 0x24 || src.charCodeAt(pos + 1) !== 0x24) return false;
    const closeIdx = src.indexOf('$$', pos + 2);
    if (closeIdx === -1) return false;
    if (!silent) {
      const token = state.push('kdmath', '', 0);
      token.markup = '$$';
      token.content = src.slice(pos + 2, closeIdx).trim();
      token.meta = { display: false };
    }
    state.pos = closeIdx + 2;
    return true;
  });

  // ---- core rule: promote a lone $$…$$ to display (block) math ----
  const isBlank = c =>
    (c.type === 'text' && c.content.trim() === '') ||
    c.type === 'softbreak' ||
    c.type === 'hardbreak';

  md.core.ruler.after('inline', 'kdmath_display', state => {
    const toks = state.tokens;
    const isContainerOpen = t => t && /^container_.*_open$/.test(t.type);
    const isContainerClose = t => t && /^container_.*_close$/.test(t.type);
    for (let i = 0; i < toks.length; i++) {
      if (toks[i].type !== 'inline' || !toks[i].children) continue;
      const prev = toks[i - 1];
      // Only paragraph / list-item content becomes block math; headings, table cells,
      // definition terms, etc. keep math inline (Kramdown parity).
      if (!prev || (prev.type !== 'paragraph_open' && prev.type !== 'list_item_open')) continue;
      const kids = toks[i].children.filter(c => !isBlank(c));
      if (kids.length !== 1 || kids[0].type !== 'kdmath') continue;
      // A $$…$$ that is the SOLE paragraph of a container (e.g. the only line of a
      // <div class="solution">) is NOT blank-line separated from the div in the source, so
      // Kramdown renders it inline — keep it a span.
      if (
        prev.type === 'paragraph_open' &&
        isContainerOpen(toks[i - 2]) &&
        isContainerClose(toks[i + 2])
      )
        continue;
      kids[0].meta.display = true;
      // Kramdown emits the div bare, not wrapped in <p> — hide the paragraph tags.
      if (prev.type === 'paragraph_open') {
        prev.hidden = true;
        const close = toks[i + 1];
        if (close && close.type === 'paragraph_close') close.hidden = true;
      }
    }
  });

  // Body is inserted RAW (Kramdown does not escape it). Delimiters are emitted for MathJax
  // (see assets/js/math-config.js) rather than kdmath HTML wrappers.
  md.renderer.rules.kdmath = (tokens, i) => {
    const t = tokens[i];
    return t.meta && t.meta.display ? `\\[\n${t.content}\n\\]\n` : `\\(${t.content}\\)`;
  };
}
