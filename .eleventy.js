const {Liquid} = require("liquidjs");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {

    eleventyConfig.addLayoutAlias('page', 'page.html');
    eleventyConfig.addLayoutAlias('default', 'default.html');

    eleventyConfig.addLayoutAlias('foot', '_layouts/foot.html');
    eleventyConfig.addLayoutAlias('head', '_layouts/head.html');
    // eleventyConfig.addLayoutAlias('default', '_layouts/default.html');

    // Add header anchor and footnotes plugin to Markdown renderer
    const markdownLib = markdownIt({html: true, typographer: true});
    markdownLib.use(markdownItFootnote).use(markdownItAnchor);
    eleventyConfig.setLibrary("md", markdownLib);

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
