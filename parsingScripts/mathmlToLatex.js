import mjnode from 'mathjax-node';

const mathmlEquation = '<math>...</math>'; // MathML equation
const options = {
    format: 'MathML',
    mml: mathmlEquation,
    out: 'latex',
};

mjnode.start();
mjnode.typeset(options, (data) => {
    if (!data.errors) {
        const latexEquation = data.tex;
        console.log(latexEquation);
    }
});
