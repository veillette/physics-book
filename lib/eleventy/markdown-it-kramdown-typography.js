// markdown-it-kramdown-typography.js
// Kramdown (parser/typographic_symbol.rb) converts only --- -- ... << >> to typographic
// symbols; it does NOT do markdown-it's extra (c)/(tm)/(r)/(p), +-, or repeat-compression.
// The baseline has 0 "©" but 1549 literal "(c)". So we drop markdown-it's `replacements`
// rule and substitute only what Kramdown does. Smartquotes (also from `typographer:true`)
// is left in place. Substitutions apply to prose text tokens only — math (kdmath_*) and
// code tokens are untouched, exactly as Kramdown leaves math/code spans alone.
// mdash, ndash, hellip, laquo, raquo (parser/typographic_symbol.rb). Order in the regex
// matters: --- before --, and the multi-char guillemets are literal pairs.
const SUBS = { '---': '—', '--': '–', '...': '…', '<<': '«', '>>': '»' };
const SUBS_RE = /---|--|\.\.\.|<<|>>/g;

export default function kramdownTypography(md) {
  md.disable('replacements');
  md.core.ruler.after('inline', 'kramdown_typographic_syms', state => {
    for (const tok of state.tokens) {
      if (tok.type !== 'inline' || !tok.children) continue;
      for (const child of tok.children) {
        if (child.type === 'text' && child.content) {
          child.content = child.content.replace(SUBS_RE, m => SUBS[m]);
        }
      }
    }
  });

  // Kramdown opens a quote only after whitespace / start / an opening bracket; a `"` (or
  // `'`) right after `=` is therefore a CLOSING quote. markdown-it's flanking logic instead
  // opens it, so `type="a"` becomes `type=“a”` here vs `type=”a”` in the baseline. This only
  // surfaces in inert leaked attribute-like text (`{ type="a"}`, `**{: class="term"}`), but
  // fixing the direction matches the baseline. Runs after markdown-it's `smartquotes` rule.
  md.core.ruler.push('kramdown_quote_direction', state => {
    for (const tok of state.tokens) {
      if (tok.type !== 'inline' || !tok.children) continue;
      for (const child of tok.children) {
        if (child.type !== 'text' || !child.content) continue;
        if (child.content.includes('=')) {
          child.content = child.content.replace(/=“/g, '=”').replace(/=‘/g, '=’');
        }
        // Attribute quotes inside an escaped tag (a mid-line block tag Kramdown escaped to
        // text, `&lt;div class="equation" &gt;`) stay STRAIGHT in the baseline — Kramdown
        // does not smartquote inside recognised (escaped) HTML. Straighten them back.
        if (child.content.includes('&lt;')) {
          child.content = child.content.replace(/&lt;[^]*?&gt;/g, s =>
            s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
          );
        }
      }
    }
  });
}
