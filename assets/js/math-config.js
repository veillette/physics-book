MathJax = {
  loader: {
    load: [],
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
  options: {
    enableAssistiveMml: false,
    menuOptions: {
      settings: {
        assistiveMml: false,
        explorer: true,
        texHints: true,
      },
    },
  },
};
