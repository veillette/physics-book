MathJax = {
  options: {
    // Skip processing elements with this class (for lazy loading)
    ignoreHtmlClass: 'mathjax-skip',
    // Enable accessible MathML output
    enableAssistiveMml: true,
    // MathJax 4 uses explorer component by default for accessibility
    // (assistive-mml was the default in v2/v3, but explorer replaced it in v4)
    menuOptions: {
      settings: {
        assistiveMml: true,
        explorer: false, // Disable explorer to avoid prohibited ARIA attributes
      },
    },
  },
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
    processEnvironments: true,
    macros: {
      KE: '{\\mathrm{KE}}',
      PE: '{\\mathrm{PE}}',
      vb: ['\\mathbf{\\vec{#1}}', 1],
      mag: ['\\lvert \\mathbf{\\vec{#1}} \\rvert', 1],
      kg: '\\mathrm{kg}',
      ms: '\\mathrm{m/s}',
      mm: '\\mathrm{m}^2',
      mms: '\\mathrm{m}^2\\mathrm{/s}',
      mmss: '\\mathrm{m}^2\\mathrm{/s}^2',
      mss: '\\mathrm{m/s}^2',
      rads: '\\mathrm{rad/s}',
      radss: '\\mathrm{rad/s}^2',
      N: '\\mathrm{N}',
      J: '\\mathrm{J}',
      s: '\\mathrm{s}',
      m: '\\mathrm{m}',
      inch: '\\mathrm{in.}',
      mile: '\\mathrm{mi.}',
      mph: '\\mathrm{mph}',
      ac: 'a_\\mathrm{c}',
    },
  },
  chtml: {
    displayOverflow: 'overflow',
    scale: 1.0,
    minScale: 0.5,
  },
};
