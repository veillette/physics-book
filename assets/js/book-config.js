
// some initial parameters
export const BookConfig = window.Book || {};

BookConfig.urlFixer ??= val => val;
BookConfig.toc ??= {};
BookConfig.toc.url ??= '../toc'; // # or '../SUMMARY' for GitBook
BookConfig.toc.selector ??= 'nav, ol, ul'; // # picks the first one that matches
BookConfig.baseHref ??= null; //  # or '//archive.cnx.org/contents'
BookConfig.serverAddsTrailingSlash ??= false; //# Used because jekyll adds trailing slashes
BookConfig.rootUrl ??= '';
BookConfig.includes ??= {};
BookConfig.includes.fontawesome ??= 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';

//# Inject the <link> tags for FontAwesome
if (BookConfig.includes.fontawesome) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = BookConfig.includes.fontawesome;
    document.head.appendChild(fa);
}
