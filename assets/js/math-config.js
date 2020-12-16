window.MathJax = {
    loader: {
        load: ['[tex]/ams']
    },
    tex: {
        packages: {
            '[+]': ['ams']
        },
        macros: {
            RR: "\\mathbf{\\vec{R}}",
            bold: ["{\\bf #1}", 1]
        },
        tags: 'ams'
    }
};