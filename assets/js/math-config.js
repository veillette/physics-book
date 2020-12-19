window.MathJax = {
    loader: {
        load: ['[tex]/ams']
    },
    tex: {
        packages: {
            '[+]': ['ams']
        },
        macros: {
            KE: '{\\text{KE}}',                  // kinetic energy
            PE: '{\\text{PE}}',                  // kinetic energy
            vb: ['\\mathbf{\\vec{#1}}', 1],     // this macro has one parameter
            mag: ['\\left|\\mathbf{\\vec{#1}}\\right|', 1],     // this macro has one parameter
            va: '\\mathbf{\\vec{a}}',     // this macro has one parameter
            vv: '\\mathbf{\\vec{v}}',     // this macro has one parameter
            vF: '\\mathbf{\\vec{F}}',     // this macro has one parameter
            vW: '\\mathbf{\\vec{W}}',     // this macro has one parameter
            vN: '\\mathbf{\\vec{W}}',     // this macro has one parameter
            kg: '\\text{kg}',     // this macro has one parameter
            ms: '\\text{m/s}',     // this macro has one parameter
            mss: '\\text{m/s}^2',     // this macro has one parameter
            rs: '\\text{rad/s}',     // this macro has one parameter
            rss: '\\text{rad/s}^2',     // this macro has one parameter
            N: '\\text{N}',     // this macro has one parameter
            J: '\\text{J}',     // this macro has one parameter
            s: '\\text{s}',     // this macro has one parameter
            m: '\\text{m}',     // this macro has one parameter
        },
        tags: 'ams'
    }
};
