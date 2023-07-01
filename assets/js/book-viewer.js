// some initial parameters
const BookConfig = window.Book || {};

BookConfig.includes ??= {};
BookConfig.urlFixer ??= val => val;
BookConfig.toc ??= {};
BookConfig.toc.url ??= '../toc'; // # or '../SUMMARY' for GitBook
BookConfig.toc.selector ??= 'nav, ol, ul'; // # picks the first one that matches
BookConfig.baseHref ??= null; //  # or '//archive.cnx.org/contents'
BookConfig.serverAddsTrailingSlash ??= false; //# Used because jekyll adds trailing slashes
BookConfig.rootUrl ??= '';
BookConfig.includes.fontawesome ??= 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';

//# Inject the <link> tags for FontAwesome
if (BookConfig.includes.fontawesome) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = BookConfig.includes.fontawesome;
    document.head.appendChild(fa);
}

const BOOK_TEMPLATE =
    `<div class="book with-summary font-size-2 font-family-1">
            <div class="book-header">
                <a href="#" class="btn pull-left toggle-summary" aria-label="Toggle summary">
                <i class="fa fa-align-justify"></i></a>
                <h1>
                <i class="fa fa-spinner fa-spin book-spinner"></i>
                <span class="book-title"></span>
                </h1>
            </div>
        <div class="book-summary">
        </div>

          <div class="book-body">
            <div class="body-inner">
              <div class="page-wrapper" tabindex="-1">
                <div class="page-inner">
                  <section class="normal">
                    <!-- content -->
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>`;

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 16);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

/**
 * Convenience function
 * @param {string} href
 * @returns {string}
 */
const removeTrailingSlash = (href) => {
    if (BookConfig.serverAddsTrailingSlash && href[href.length - 1] === '/') {
        href = href.substring(0, href.length - 1);
    }
    return href;
};

/**
 * convenience function
 * @param {string} href
 * @returns {string}
 */
const addTrailingSlash = (href) => {
    if (BookConfig.serverAddsTrailingSlash && href[href.length - 1] !== '/') {
        href += '/';
    }
    return href;
};


/**
 * Fix up the ToC links if the links to pages end in `.md`
 * @param {Element} a
 */
const mdToHtmlFix = (a) => {
    let href = a.getAttribute('href');
    if (href) {
        href = href.replace(/\.md/, '.html');
        a.setAttribute('href', href);
    }
};

function parser() {
    //# Squirrel the body and replace it with the template:
    const body = $('body');
    let originalPage = body.contents();
    body.contents().remove();
    body.append(BOOK_TEMPLATE);

    // Pull out all the interesting DOM nodes from the template
    const $book = body.find('.book');
    const $bookSummary = $book.find('.book-summary');
    const bookSummary = document.querySelector('.book-summary');
    const $bookPage = $book.find('.page-inner > .normal');
    const bookTitle = document.querySelector('.book-title');
    const bookBody = document.querySelector('.book-body');
    const toggleSummary = document.querySelector('.toggle-summary');

    toggleSummary.addEventListener('click', function (evt) {
        document.querySelector('.book').classList.toggle('with-summary');
        evt.preventDefault();
    });

    /**
     * render the summary on the left-hand side of the page
     */
    const renderToc = () => {
        const summary = document.createElement('ul');
        summary.className = 'summary';

        const tocChildren = Array.from(tocHelper.toc.children);
        tocChildren.forEach(function (li) {
            summary.appendChild(li);
        });

        // Update the ToC to show which links have been visited
        // Add a "hidden" checkmark next to each item
        const visitedLinks = JSON.parse(window.localStorage.visited) || {};
        const linkElements = summary.querySelectorAll('a[href]');
        linkElements.forEach(function (link) {
            const href = link.getAttribute('href');
            const parentLi = link.parentNode;
            const checkmarkIcon = document.createElement('i');
            checkmarkIcon.className = 'fa fa-check';
            parentLi.insertBefore(checkmarkIcon, link);

            if (visitedLinks[href]) {
                parentLi.classList.add('visited');
            }
        });

        const currentPagePath = new URL(window.location.href).pathname;

        const currentPageLi =
            bookSummary.querySelector(".summary li:has(> a[href='" + currentPagePath + "'])");
        if (currentPageLi) {
            currentPageLi.parentNode.parentNode.scrollIntoView();
        }

        const existingSummary =
            bookSummary.querySelector('.summary');
        if (existingSummary) {
            existingSummary.remove();
        }

        bookSummary.appendChild(summary);

        renderNextPrev();
    };

    const renderNextPrev = () => {

        // Remove existing navigation buttons
        const existingNavigation = bookBody.querySelectorAll('.navigation');
        existingNavigation.forEach(nav => nav.remove());

        const current = removeTrailingSlash(window.location.href);
        let prev = tocHelper.prevPageHref(current);
        let next = tocHelper.nextPageHref(current);

        if (prev) {
            prev = new URL(addTrailingSlash(prev), window.location.href).pathname;
            const prevPage = document.createElement('a');
            prevPage.className = 'navigation navigation-prev';
            prevPage.href = prev;
            prevPage.innerHTML = "<i class='fa fa-chevron-left'></i>";
            bookBody.appendChild(prevPage);
        }

        if (next) {
            next = new URL(addTrailingSlash(next), window.location.href).pathname;
            const nextPage = document.createElement('a');
            nextPage.className = 'navigation navigation-next';
            nextPage.href = next;
            nextPage.innerHTML = "<i class='fa fa-chevron-right'></i>";
            bookBody.appendChild(nextPage);
        }
    };

    /**
     *
     * @param els
     * @param href
     * @returns {*}
     */
    const pageBeforeRender = (els, href) => {
        let _ref2;
        const _ref = els.find('a[href]');
        for (const el of _ref) {
            mdToHtmlFix(el);
        }

        // Convert `img[title]` tags into figures, so they get numbered and titles are visible
        const _ref1 = els.find('img[title]');
        for (const img of _ref1) {
            const $img = $(img);
            const id = $img.attr('id');
            $img.removeAttr('id');
            const $figure = $img.wrap('<figure>').parent();
            $figure.append("<figcaption>" + ($img.attr('title')) + "</figcaption>");
            if ($img.attr('data-title')) {
                $figure.prepend("<div class='title'>" + ($img.attr('data-title')) + "</div>");
            }
            $figure.attr('id', id);
        }

        // From `webview/body.coffee`
        // Wrap title and content elements in header and section elements, respectively
        els.find('.example, .exercise, .note').each(function (index, el) {
            const $el = $(el);
            const contents = $el.contents().filter(function (i, node) {
                return !$(node).is('.title');
            });
            contents.wrapAll('<section>');
            const title = $el.children('.title');
            $el.prepend(title);
            title.wrap('<header>');
            // Add an attribute for the parents' `data-label`
            // since CSS does not support `parent(attr(data-label))`.
            // When the title exists, this attribute is added before it

            title.attr('data-label-parent', $el.attr('data-label'));
            // Add a class for styling since CSS does not support `:has(> .title)`
            return $el.toggleClass('ui-has-child-title', title.length > 0);
        });
        //# Wrap solutions in a div so "Show/Hide Solutions" work
        els.find('.solution').wrapInner('<section class="ui-body">').prepend('<div class="ui-toggle-wrapper">\n  <button class="btn-link ui-toggle" title="Show/Hide Solution"></button>\n</div>');
        els.on('click', '.ui-toggle', function (e) {
            const solution = $(e.currentTarget).closest('.solution');
            return solution.toggleClass('ui-solution-visible');
        });
        els.find('figure:has(> figcaption)').addClass('ui-has-child-figcaption');

        //    Move all figure captions below the figure
        els.find('figcaption').each(function (i, el) {
            return $(el).parent().append(el);
        });
        // Remember that this page has been visited
        const currentPagePath = new URL(href, window.location.href).pathname;
        const visited = window.localStorage.visited && JSON.parse(window.localStorage.visited) || {};
        visited[currentPagePath] = new Date();
        window.localStorage.visited = JSON.stringify(visited);
        if ((_ref2 = $bookSummary.find(".summary li:has(> a[href='" + currentPagePath + "'])").addClass('visited').parent().parent()[0]) != null) {
            _ref2.scrollIntoView();
        }
        const selector = 'h1, h2, h3, h4, h5, h6';
        const all = els.filter(selector).add(els.find(selector));
        all.each(function (i, el) {
            const $el = $(el);
            const id = $el.attr('id');
            if (id) {
                const icon = '<i class="fa fa-link"></i>';
                const a = $('<a />').addClass('header-link').attr('href', '#' + id).html(icon);
                return $el.prepend(a);
            }
        });
        if (typeof MathJax.startup !== "undefined" && MathJax.startup !== null) {
            MathJax.startup.promise = MathJax.startup.promise
                .then(() => MathJax.typesetPromise(els))
                .catch((err) => console.log('Typeset failed: ' + err.message));
            return MathJax.startup.promise;
        } else {
            return void 0;
        }
    };


    /**
     *
     * @constructor
     */

    function TocHelper() {

        // {string[]}
        this._tocList = [];
        this._tocTitles = {};

        /**
         * @param {Element} toc
         * @param {string} title
         * @returns {function}
         */
        this.loadToc = function (toc, title) {
            this.toc = toc;
            this.title = title;
            const tocUrl = new URL(BookConfig.toc.url, removeTrailingSlash(window.location.href));
            const refElements = toc.querySelectorAll('a[href]');

            refElements.forEach(function (el) {
                mdToHtmlFix(el);
                const href = new URL(el.getAttribute('href'), tocUrl).pathname;
                el.setAttribute('href', href);
            });

            this._tocTitles = {};
            const self = this;
            this._tocList = Array.from(toc.querySelectorAll('a[href]')).map(function (el) {
                const href = new URL(el.getAttribute('href'), tocUrl).toString();
                self._tocTitles[href] = el.textContent;
                return href;
            });

            if (BookConfig.serverAddsTrailingSlash) {
                const aElements = toc.querySelectorAll('a');
                aElements.forEach(function (a) {
                    let href = a.getAttribute('href');
                    href = '../' + href;
                    a.setAttribute('href', href);
                });
            }

            return renderToc();
        };

        /**
         * @private
         * @param {string} currentHref
         * @returns {number}
         */
        this.currentPageIndex = function (currentHref) {
            return this._tocList.indexOf(currentHref);
        };

        /**
         * @protected
         * @param {string} currentHref
         * @returns {string|undefined}
         */
        this.prevPageHref = function (currentHref) {
            const currentIndex = this.currentPageIndex(currentHref);
            return this._tocList[currentIndex - 1]; //# returns undefined if no previous page
        };

        /**
         * @protected
         * @param {string} currentHref
         * @returns {string|undefined}
         */
        this.nextPageHref = function (currentHref) {
            const currentIndex = this.currentPageIndex(currentHref);
            return this._tocList[currentIndex + 1]; // # returns undefined if no next page
        };
    }

    const tocHelper = new TocHelper();

    fetch(BookConfig.urlFixer(BookConfig.toc.url), {
        headers: {
            'Accept': 'application/xhtml+xml'
        }
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (html) {
            let title;
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const root = doc.createElement('div');
            root.innerHTML = html;

            let toc = root.querySelector(BookConfig.toc.selector);
            if (toc.tagName.toLowerCase() === 'ul') {
                // HACK for collection HTML
                title = toc.firstElementChild.textContent;
                toc = toc.querySelector('ul');
            } else {
                title = doc.querySelector('title').textContent;
            }

            tocHelper.loadToc(toc, title);
            bookTitle.textContent = tocHelper.title;
        });


    //  # Fetch resources without fixing up their paths
    if (BookConfig.baseHref) {
        $book.find('base').remove();
        $book.prepend("<base href='" + BookConfig.baseHref + "'/>");
    }
    originalPage = $('<div class="contents"></div>').append(originalPage);
    pageBeforeRender(originalPage, new URL(window.location.href).pathname);
    $bookPage.append(originalPage);

    /**
     *
     * @param {string} href
     * @returns {Promise<string>}
     */
    const changePage = (href) => {
        $book.addClass('loading');

        const requestPromise = fetch(BookConfig.urlFixer(href), {
            headers: {
                'Accept': 'application/xhtml+xml'
            }
        }).then(response => response.text());

        const promise = Promise.resolve(requestPromise).then(function (html) {
            //# Use `window.location.origin` to get around a <base href=""> pointing to another hostname
            if (!/https?:\/\//.test(href)) {
                href = "" + window.location.origin + href;
            }
            window.history.pushState(null, null, href);
            renderNextPrev();

            // Need to set the URL *before* <img> tags area created
            // Fetch resources without fixing up their paths
            if (BookConfig.baseHref) {
                $book.find('base').remove();
                $book.prepend("<base href='" + (BookConfig.urlFixer(href)) + "'/>");
            }
            const $html = $("<div>" + html + "</div>");
            $html.children('meta, link, script, title').remove();
            $bookPage.contents().remove();
            const page = $('<div class="contents"></div>').append($html.children());
            pageBeforeRender(page, href);
            $bookPage.append(page); // TODO: Strip out title and meta tags
            $book.removeClass('loading');
            //    # Scroll to top of the page after loading
            return $('.body-inner').scrollTop(0);
        });

        return promise;
    };

    document.body.addEventListener('click', function (evt) {
        let target = evt.target;
        while (target && target.tagName !== 'A') {
            target = target.parentNode;
        }

        if (target && target.getAttribute('href') &&
            !target.getAttribute('href').startsWith('#') &&
            !target.getAttribute('href').startsWith('https')) {
            evt.preventDefault();
            const hrefRelative = addTrailingSlash(target.getAttribute('href'));
            const href = new URL(hrefRelative, window.location.href).toString();
            changePage(href);
        }
    });

}

docReady(parser);
