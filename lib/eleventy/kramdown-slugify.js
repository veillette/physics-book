// kramdown-slugify.js — replicates Kramdown's basic_generate_id (converter/base.rb)
// EXACTLY, so markdown-it-anchor produces the same heading ids Kramdown did. Order and
// the per-space substitution matter: "Problems & Exercises" must yield the DOUBLE-dash
// "problems--exercises" (the & is stripped, its two surrounding spaces each become a
// dash — NOT collapsed). Cross-references and the parity comparator depend on this.
export function kramdownSlugify(text) {
  const id = String(text)
    .replace(/^[^a-zA-Z]+/, '') // strip leading non-letters
    .replace(/[^a-zA-Z0-9 -]/g, '') // drop everything but letters, digits, spaces, dashes
    .replace(/ /g, '-') // each space -> a dash (Kramdown uses tr, not a collapsing gsub)
    .toLowerCase();
  return id || 'section';
}
