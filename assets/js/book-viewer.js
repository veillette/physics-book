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

    // Pull out all the interesting DOM nodes from the template
    const body = document.body;

    let originalPage = Array.from(body.childNodes);

    body.innerHTML = '';
    body.insertAdjacentHTML('beforeend', BOOK_TEMPLATE);

    const book = body.querySelector('.book');
    const bookPage = book.querySelector('.page-inner > .normal');
    const bookSummary = book.querySelector('.book-summary');
    const bookTitle = book.querySelector('.book-title');
    const bookBody = book.querySelector('.book-body');
    const toggleSummary = book.querySelector('.toggle-summary');

    toggleSummary.addEventListener('click', function (event) {
        book.classList.toggle('with-summary');
        event.preventDefault();
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
     * @param {Element} els
     * @param {string} href
     * @returns {undefined|*}
     */
    const newPageBeforeRender = (els, href) => {

        els.querySelectorAll('a[href]').forEach(el => {
            mdToHtmlFix(el);
        })

        els.querySelectorAll('img[title]').forEach(img => {
            const id = img.getAttribute('id');
            img.removeAttribute('id');
            const figure = document.createElement('figure');
            img.parentNode.insertBefore(figure, img);
            figure.appendChild(img);
            const caption = document.createElement('figcaption');
            caption.textContent = img.getAttribute('title');
            figure.appendChild(caption);
            if (img.getAttribute('data-title')) {
                const title = document.createElement('div');
                title.className = 'title';
                title.textContent = img.getAttribute('data-title');
                figure.insertBefore(title, img);
            }
            figure.setAttribute('id', id);
        });

        els.querySelectorAll('.example, .exercise, .note').forEach(function (el) {
            const contents = Array.from(el.childNodes).filter(function (node) {
                return !node.classList || !node.classList.contains('title');
            });
            const section = document.createElement('section');
            contents.forEach(function (node) {
                section.appendChild(node);
            });
            el.append(section);

            const title = el.querySelector('.title');
            if (title) {
                el.insertBefore(title, el.firstChild);

                const header = document.createElement('header');
                header.append(title);
                el.insertBefore(header, el.firstChild);

                // Add an attribute for the parents' `data-label`
                // since CSS does not support `parent(attr(data-label))`.
                // When the title exists, this attribute is added before it
                const dataLabelParent = el.getAttribute('data-label');
                title.setAttribute('data-label-parent', dataLabelParent);
            }

            el.classList.toggle('ui-has-child-title', title !== null);
        });

        els.querySelectorAll('.solution').forEach(function (solution) {
            const section = document.createElement('section');
            while (solution.firstChild) {
                section.appendChild(solution.firstChild);
            }
            solution.appendChild(section);
            const toggleWrapper = document.createElement('div');
            toggleWrapper.className = 'ui-toggle-wrapper';
            solution.insertBefore(toggleWrapper, solution.firstChild);
            const toggleButton = document.createElement('button');
            toggleButton.className = 'btn-link ui-toggle';
            toggleButton.setAttribute('title', 'Show/Hide Solution');
            toggleWrapper.appendChild(toggleButton);
            toggleButton.addEventListener('click', function (e) {
                const solution = e.currentTarget.closest('.solution');
                solution.classList.toggle('ui-solution-visible');
            });
        });

        els.querySelectorAll('figure:has(> figcaption)').forEach(function (figure) {
            figure.classList.add('ui-has-child-figcaption');
        });

        els.querySelectorAll('figcaption').forEach(function (figcaption) {
            figcaption.parentNode.appendChild(figcaption);
        });

        const currentPagePath = new URL(href, window.location.href).pathname;
        const visited = (window.localStorage.visited && JSON.parse(window.localStorage.visited)) || {};
        visited[currentPagePath] = new Date();
        window.localStorage.visited = JSON.stringify(visited);

        const listItem = bookSummary.querySelector(".summary li:has(> a[href='" + currentPagePath + "'])");

        if (listItem !== null) {
            listItem.classList.add('visited');
            const parentElement = listItem.parentElement.parentElement;
            parentElement.scrollIntoView();
        }

        const selector = 'h1, h2, h3, h4, h5, h6';
        const all = Array.from(els.querySelectorAll(selector)).concat(Array.from(els.querySelectorAll(selector)));
        all.forEach(function (el) {
            const id = el.getAttribute('id');
            if (id) {
                const icon = document.createElement('i');
                icon.className = 'fa fa-link';
                const a = document.createElement('a');
                a.className = 'header-link';
                a.setAttribute('href', '#' + id);
                a.appendChild(icon);
                el.insertBefore(a, el.firstChild);
            }
        });


        if (typeof MathJax.startup !== "undefined" && MathJax.startup !== null) {
            MathJax.startup.promise = MathJax.startup.promise
                .then(() => MathJax.typesetPromise([els]))
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
        const baseElement = book.querySelector('base');
        if (baseElement) {
            baseElement.remove();
        }
        const baseTag = document.createElement('base');
        baseTag.setAttribute('href', BookConfig.baseHref);
        book.prepend(baseTag);
    }

    const altPage = document.createElement('div');
    altPage.className = 'contents';
    altPage.append(...originalPage);
    newPageBeforeRender(altPage, new URL(window.location.href).pathname);
    bookPage.append(altPage);


    /**
     *
     * @param {string} href
     * @returns {Promise<string>}
     */
    const changePage = (href) => {
        book.classList.add('loading');

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
                const baseElement = book.querySelector('base');
                if (baseElement) {
                    baseElement.remove();
                }
                const baseTag = document.createElement('base');
                baseTag.setAttribute('href', BookConfig.urlFixer(href));
                book.prepend(baseTag);
            }

            const htmlDivElement = document.createElement('div');
            htmlDivElement.innerHTML = html;
            htmlDivElement.querySelectorAll('meta, link, script, title').forEach(function (el) {
                el.remove();
            });

            bookPage.innerHTML = '';
            const altPage = document.createElement('div');
            altPage.className = 'contents';
            altPage.append(...htmlDivElement.childNodes);
            newPageBeforeRender(altPage, href);
            bookPage.append(altPage);

            book.classList.remove('loading');

            //    # Scroll to top of the page after loading
            document.querySelector('.body-inner').scrollTop = 0;
        });

        return promise;
    };

    document.body.addEventListener('keydown', function (event) {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

        let link;
        switch (key) {
            case "ArrowLeft":
                // Left pressed
                link = document.querySelector('.book .navigation-prev');
                break;
            case "ArrowRight":
                // Right pressed
                link = document.querySelector('.book .navigation-next');
                break;
            case "ArrowUp":
                // Up pressed
                link = null;
                break;
            case "ArrowDown":
                // Down pressed
                link = null;
                break;
            default:
                link = null;
                break;
        }

        if (!document.activeElement.matches('.book-search-input')) {
            if (link !== null) {
                link.click();
            }
        }
    });

    document.body.addEventListener('click', function (event) {
        let target = event.target;
        while (target && target.tagName !== 'A') {
            target = target.parentNode;
        }

        if (target && target.getAttribute('href') &&
            !target.getAttribute('href').startsWith('#') &&
            !target.getAttribute('href').startsWith('https')) {
            event.preventDefault();
            const hrefRelative = addTrailingSlash(target.getAttribute('href'));
            const href = new URL(hrefRelative, window.location.href).toString();
            changePage(href);
        }
    });
}

docReady(parser);
