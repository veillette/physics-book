(function () {

    const BookConfig = window.Book || {};
    BookConfig.includes ??= {};
    BookConfig.urlFixer ??= val => val;
    BookConfig.toc ??= {};
    BookConfig.toc.url ??= '../toc'; // # or '../SUMMARY' for GitBook
    BookConfig.toc.selector ??= 'nav, ol, ul'; // # picks the first one that matches
    BookConfig.baseHref ??= null; //  # or '//archive.cnx.org/contents'
    BookConfig.serverAddsTrailingSlash ??= false; //# Used because jekyll adds trailing slashes
    BookConfig.contributeUrl ??= null;
    BookConfig.rootUrl ??= '';
    BookConfig.includes.fontawesome ??= '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';

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
                <div class="book-progress">
                  <div class="bar">
                    <div class="inner" style="min-width: 0;"></div>
                  </div>
                </div>
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
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    docReady(function () {
        //# Squirrel the body and replace it with the template:
        const body = $('body');
        let originalPage = body.contents();
        body.contents().remove();
        body.append(BOOK_TEMPLATE);

        // Pull out all the interesting DOM nodes from the template
        const book = body.find('.book');
        const toggleSummary = book.find('.toggle-summary');
        const bookSummary = book.find('.book-summary');
        const bookBody = book.find('.book-body');
        const bookPage = book.find('.page-inner > .normal');
        const bookTitle = book.find('.book-title');
        const bookProgressBar = book.find('.book-progress .bar .inner');
        toggleSummary.on('click', function (evt) {
            book.toggleClass('with-summary');
            return evt.preventDefault();
        });
        const updateContributeUrl = href => {
            href = URI(href).relativeTo(URI(BookConfig.rootUrl + '/')).pathname();
            href = href.replace(/\.html$/, '.md');
            return bookSummary.find('.edit-contribute > a').attr('href', "" + BookConfig.contributeUrl + "/" + href);
        };
        const renderToc = () => {
            const summary = $('<ul class="summary"></ul>');
            if (BookConfig.issuesUrl) {
                summary.append("<li class='issues'><a target='_blank' href='" + BookConfig.issuesUrl + "'>Questions and Issues</a></li>");
            }
            if (BookConfig.contributeUrl) {
                summary.append("<li class='edit-contribute'><a target='_blank' href='" + BookConfig.contributeUrl + "'>Edit and Contribute</a></li>");
            }
            summary.append('<li class="divider"/>');
            summary.append(tocHelper.toc.children('li'));

            // Update the ToC to show which links have been visited
            // Add a "hidden" checkmark next to each item
            summary.find('a[href]').parent().prepend('<i class="fa fa-check"></i>');
            for (let key in JSON.parse(window.localStorage.visited)) {
                summary.find("li:has(> a[href='" + key + "'])").addClass('visited');
            }
            bookSummary.children('.summary').remove();
            bookSummary.append(summary);
            const currentPagePath = URI(window.location.href).pathname();

            const _ref = bookSummary.find(".summary li:has(> a[href='" + currentPagePath + "'])").parent().parent()[0]
            if (_ref != null) {
                _ref.scrollIntoView();
            }
            renderNextPrev();
            return updateContributeUrl(currentPagePath);
        };
        const renderNextPrev = () => {
            // Update the progress bar
            const currentPageIndex = tocHelper._tocList.indexOf(window.location.href);
            const totalPageCount = tocHelper._tocList.length;
            bookProgressBar.width("" + (currentPageIndex * 100 / totalPageCount) + "%");
            bookProgressBar.attr('title', "Reading Page " + currentPageIndex + " of " + totalPageCount);

            // Add next/prev buttons to the page
            bookBody.children('.navigation').remove();
            const current = removeTrailingSlash(window.location.href);
            let prev = tocHelper.prevPageHref(current);
            let next = tocHelper.nextPageHref(current);
            if (prev) {
                prev = URI(addTrailingSlash(prev)).relativeTo(URI(window.location.href)).toString();
                const prevPage = $("<a class='navigation navigation-prev' href='" + prev + "'><i class='fa fa-chevron-left'></i></a>");
                bookBody.append(prevPage);
            }
            if (next) {
                next = URI(addTrailingSlash(next)).relativeTo(URI(window.location.href)).toString();
                const nextPage = $("<a class='navigation navigation-next' href='" + next + "'><i class='fa fa-chevron-right'></i></a>");
                return bookBody.append(nextPage);
            }
        };
        const addTrailingSlash = (href) => {
            if (BookConfig.serverAddsTrailingSlash && href[href.length - 1] !== '/') {
                href += '/';
            }
            return href;
        };
        const removeTrailingSlash = (href) => {
            if (BookConfig.serverAddsTrailingSlash && href[href.length - 1] === '/') {
                href = href.substring(0, href.length - 1);
            }
            return href;
        };
        //  # Fix up the ToC links if the links to pages end in `.md`
        const mdToHtmlFix = (a) => {
            let href = a.getAttribute('href');
            if (href) {
                href = href.replace(/\.md/, '.html');
                return a.setAttribute('href', href);
            }
        };
        const pageBeforeRender = (els, href) => {
            let _ref2;
            updateContributeUrl(href);

            const _ref = els.find('a[href]');
            for (const el of _ref) {
                mdToHtmlFix(el);
            }

            // Convert `img[title]` tags into figures so they get numbered and titles are visible
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
            const currentPagePath = URI(href).pathname();
            const visited = window.localStorage.visited && JSON.parse(window.localStorage.visited) || {};
            visited[currentPagePath] = new Date();
            window.localStorage.visited = JSON.stringify(visited);
            if ((_ref2 = bookSummary.find(".summary li:has(> a[href='" + currentPagePath + "'])").addClass('visited').parent().parent()[0]) != null) {
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


        function TocHelper() {

            this._tocList = [];

            this._tocTitles = {};

            /**
             *
             * @param toc
             * @param title
             * @returns {function}
             */
            this.loadToc = function (toc, title) {
                this.toc = toc;
                this.title = title;
                const tocUrl = URI(BookConfig.toc.url).absoluteTo(removeTrailingSlash(window.location.href));
                const _ref = this.toc.find('a[href]');

                for (const el of _ref) {
                    mdToHtmlFix(el);
                    const href = URI(el.getAttribute('href')).absoluteTo(tocUrl).pathname().toString();
                    el.setAttribute('href', href);
                }
                this._tocTitles = {};
                const self = this;
                this._tocList = (function () {
                    const _ref1 = toc.find('a[href]');
                    const _results = [];
                    for (const el of _ref1) {
                        const href = URI(el.getAttribute('href')).absoluteTo(tocUrl).toString();
                        self._tocTitles[href] = $(el).text();
                        _results.push(href);
                    }
                    return _results;
                }).call(this);
                if (BookConfig.serverAddsTrailingSlash) {
                    const _ref1 = this.toc.find('a');
                    for (const a of _ref1) {
                        const $a = $(a);
                        let href = $a.attr('href');
                        href = '../' + href;
                        $a.attr('href', href);
                    }
                }
                return renderToc();
            };

            /**
             * @private
             * @param currentHref
             * @returns {number}
             */
            this.currentPageIndex = function (currentHref) {
                return this._tocList.indexOf(currentHref);
            };

            /**
             * @private
             * @param currentHref
             * @returns {number}
             */
            this.prevPageHref = function (currentHref) {
                const currentIndex = this.currentPageIndex(currentHref);
                return this._tocList[currentIndex - 1]; //# returns undefined if no previous page
            };

            /**
             * @private
             * @param currentHref
             * @returns {number}
             */
            this.nextPageHref = function (currentHref) {
                const currentIndex = this.currentPageIndex(currentHref);
                return this._tocList[currentIndex + 1]; // # returns undefined if no next page
            };
        }

        const tocHelper = new TocHelper();

        $.ajax({
            url: BookConfig.urlFixer(BookConfig.toc.url),
            headers: {
                'Accept': 'application/xhtml+xml'
            },
            dataType: 'html'
        }).then(function (html) {
            let title;
            const $root = $('<div>' + html + '</div>');
            let toc = $root.find(BookConfig.toc.selector).first();
            if (toc[0].tagName.toLowerCase() === 'ul') {
                //# HACK for collection HTML
                title = toc.children().first().contents();
                toc = toc.find('ul').first();
            } else {
                title = $root.children('title').contents();
            }
            tocHelper.loadToc(toc, title);
            return bookTitle.html(tocHelper.title);
        });
        //  # Fetch resources without fixing up their paths
        if (BookConfig.baseHref) {
            book.find('base').remove();
            book.prepend("<base href='" + BookConfig.baseHref + "'/>");
        }
        originalPage = $('<div class="contents"></div>').append(originalPage);
        pageBeforeRender(originalPage, URI(window.location.href).pathname());
        bookPage.append(originalPage);
        const changePage = (href) => {
            book.addClass('loading');
            return Promise.resolve($.ajax({
                url: BookConfig.urlFixer(href),
                headers: {
                    'Accept': 'application/xhtml+xml'
                },
                dataType: 'html'
            }).then(function (html) {
                //# Use `window.location.origin` to get around a <base href=""> pointing to another hostname
                if (!/https?:\/\//.test(href)) {
                    href = "" + window.location.origin + href;
                }
                window.history.pushState(null, null, href);
                renderNextPrev();

                // Need to set the URL *before* <img> tags area created
                // Fetch resources without fixing up their paths
                if (BookConfig.baseHref) {
                    book.find('base').remove();
                    book.prepend("<base href='" + (BookConfig.urlFixer(href)) + "'/>");
                }
                const $html = $("<div>" + html + "</div>");
                $html.children('meta, link, script, title').remove();
                bookPage.contents().remove();
                const page = $('<div class="contents"></div>').append($html.children());
                pageBeforeRender(page, href);
                bookPage.append(page); // TODO: Strip out title and meta tags
                book.removeClass('loading');
                //    # Scroll to top of page after loading
                return $('.body-inner').scrollTop(0);
            }));
        };

        //  # Listen to clicks and handle them without causing a page reload
        $('body').on('click', 'a[href]:not([href^="#"]):not([href^="https"])', function (evt) {
            const hrefRelative = addTrailingSlash($(this).attr('href'));
            const href = URI(hrefRelative).absoluteTo(URI(window.location.href)).toString();
            changePage(href);
            return evt.preventDefault();
        });
    });

}).call(this);
