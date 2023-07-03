const {Liquid} = require("liquidjs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const mathjax3 = require('markdown-it-mathjax3');
const markdownItFootnote = require("markdown-it-footnote");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function (eleventyConfig) {

    eleventyConfig.addLayoutAlias('page', 'page.html');
    eleventyConfig.addLayoutAlias('default', 'default.html');

    // eleventyConfig.addLayoutAlias('foot', '_layouts/foot.html');
    // eleventyConfig.addLayoutAlias('head', '_layouts/head.html');

    let markdownItOptions = {
        html: true, // you can include HTML tags,
        typographer: true
    }

    // Add footnote plugin to Markdown renderer
    const markdownLib = markdownIt(markdownItOptions);
    eleventyConfig.setLibrary("md", markdownLib);
    markdownLib
     //   .use(mathjax3)
        .use(markdownItFootnote)
        .use(markdownItAnchor)
        .use(markdownItAttrs);

    // Enable syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);

    // Copy anything in the assets/ folder verbatim
    eleventyConfig.addPassthroughCopy("assets");


    eleventyConfig.addPassthroughCopy("resources");


    let options = {
        extname: ".liquid",
        dynamicPartials: false,
        strictFilters: false,
        jsTruthy: true,
        root: ["site/_layouts"]
    };

    eleventyConfig.setLibrary("liquid", new Liquid(options));

    return {
        dir: {
            input: "./",      // Equivalent to Jekyll's source property
            output: "./_site", // Equivalent to Jekyll's destination property
            includes: "_includes",
            layouts: "_layouts"
        }
    };
};
