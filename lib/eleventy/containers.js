// containers.js — Eleventy-side counterpart to the P5 content converter.
//
// The converter rewrites Kramdown `<div class="note" markdown="1"> … </div>` blocks
// into fenced containers: `::: note {"class":"note","data-label":"Video"}` … `:::`.
// Here we register one markdown-it-container per known type whose render function
// rebuilds the ORIGINAL element from the JSON attribute blob (roadmap section 4.3).
// The JSON carries every original attribute; when a container has only its class,
// the converter omits the blob and we default to `{ class: type }`.
//
// The type list covers all supported block containers: abstract, example, problem,
// solution, note, glossary, footnote-refs, figure, and interactive.
// `exercise` is included though no source block currently carries markdown="1" on an
// exercise wrapper.
export const CONTAINER_TYPES = [
  'abstract',
  'example',
  'problem',
  'solution',
  'note',
  'interactive', // note+interactive duplicate-class divs render as class="interactive"
  'glossary',
  'footnote-refs',
  'figure',
  'exercise',
];

export function registerContainers(md, markdownItContainer) {
  for (const type of CONTAINER_TYPES) {
    md.use(markdownItContainer, type, {
      render(tokens, idx) {
        const tag = type === 'figure' ? 'figure' : 'div';
        if (tokens[idx].nesting === 1) {
          const info = tokens[idx].info.trim().slice(type.length).trim();
          const attrs = info ? JSON.parse(info) : { class: type };
          const html = Object.entries(attrs)
            .map(([k, v]) => `${k}="${md.utils.escapeHtml(String(v))}"`)
            .join(' ');
          return `<${tag} ${html}>\n`;
        }
        return `</${tag}>\n`;
      },
    });
  }
}
