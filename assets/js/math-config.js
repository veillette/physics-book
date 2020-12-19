window.MathJax = {
    loader: {
        load: ['[tex]/ams']
    },
    tex: {
        packages: {
            '[+]': ['ams']
        },
        macros: {
            KE: '{\\mathrm{KE}}',                  // kinetic energy
            PE: '{\\mathrm{PE}}',                  // kinetic energy
            vb: ['\\mathbf{\\vec{#1}}', 1],     // this macro has one parameter
            mag: ['\\left|\\mathbf{\\vec{#1}}\\right|', 1],     // this macro has one parameter
            kg: '\\mathrm{kg}',     // this macro has one parameter
            ms: '\\mathrm{m/s}',     // this macro has one parameter
            mss: '\\mathrm{m/s}^2',     // this macro has one parameter
            rs: '\\mathrm{rad/s}',     // this macro has one parameter
            rss: '\\mathrm{rad/s}^2',     // this macro has one parameter
            N: '\\mathrm{N}',     // this macro has one parameter
            J: '\\mathrm{J}',     // this macro has one parameter
            s: '\\mathrm{s}',     // this macro has one parameter
            m: '\\mathrm{m}',     // this macro has one parameter
        },
        tags: 'ams'
    }
};
