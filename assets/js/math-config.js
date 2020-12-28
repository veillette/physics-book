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
            PE: '{\\mathrm{PE}}',                  // potential energy
            vb: ['\\mathbf{\\vec{#1}}', 1],     // this macro has one parameter
            mag: ['\\left|\\mathbf{\\vec{#1}}\\right|', 1],     // this macro has one parameter
            kg: '\\mathrm{kg}',     // kg
            ms: '\\mathrm{m/s}',     // m/s
            mm: '\\mathrm{m}^2',     // m^2
            mms: '\\mathrm{m}^2\\mathrm{/s}' ,     // m^2/s
            mmss: '\\mathrm{m}^2\\mathrm{/s}^2',    // m^2/s^2
            mss: '\\mathrm{m/s}^2',     // m/s^2
            rads: '\\mathrm{rad/s}',     // rad/s
            radss: '\\mathrm{rad/s}^2',     // rad/s^2
            N: '\\mathrm{N}',     // N
            J: '\\mathrm{J}',     // J
            s: '\\mathrm{s}',     // s
            m: '\\mathrm{m}',     // m
            inch: '\\mathrm{in.}',     // in.
            mile: '\\mathrm{mi.}',     // mi.
            mph: '\\mathrm{mph}',     // mph
            ac: 'a_\\mathrm{c}',     // a_c
        },
        tags: 'ams'
    }
};
