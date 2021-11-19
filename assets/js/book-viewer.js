(function () {
    let BOOK_TEMPLATE, BookConfig, fa, _base, _base1, _base2;

    BookConfig = window.Book || {};

    if (BookConfig.includes == null) {
        BookConfig.includes = {};
    }

    _base = BookConfig.includes
    if (_base.fontawesome == null) {
        _base.fontawesome = '//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css';
    }

    if (BookConfig.urlFixer == null) {
        BookConfig.urlFixer = val => {
            return val;
        };
    }

    if (BookConfig.toc == null) {
        BookConfig.toc = {};
    }

    _base1 = BookConfig.toc
    if (_base1.url == null) {
        _base1.url = '../toc'; // # or '../SUMMARY' for GitBook
    }

    _base2 = BookConfig.toc
    if (_base2.selector == null) {
        _base2.selector = 'nav, ol, ul'; // # picks the first one that matches
    }

    if (BookConfig.baseHref == null) {
        BookConfig.baseHref = null;
    }

    if (BookConfig.serverAddsTrailingSlash == null) {
        BookConfig.serverAddsTrailingSlash = false; //# Used because jekyll adds trailing slashes
    }


    if (BookConfig.contributeUrl == null) {
        BookConfig.contributeUrl = null;
    }

    BookConfig.rootUrl = BookConfig.rootUrl || '';

    //# Inject the <link> tags for FontAwesome
    if (BookConfig.includes.fontawesome) {
        fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = BookConfig.includes.fontawesome;
        document.head.appendChild(fa);
    }

    BOOK_TEMPLATE = `<div class="book with-summary font-size-2 font-family-1">

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
    $(function () {
        let $body, $book, $bookBody, $bookPage, $bookProgressBar, $bookSummary, $bookTitle,
            $originalPage, $toggleSummary, TocHelper
        //# Squirrel the body and replace it with the template:
        $body = $('body');
        $originalPage = $body.contents();
        $body.contents().remove();
        $body.append(BOOK_TEMPLATE);

        // Pull out all the interesting DOM nodes from the template
        $book = $body.find('.book');
        $toggleSummary = $book.find('.toggle-summary');
        $bookSummary = $book.find('.book-summary');
        $bookBody = $book.find('.book-body');
        $bookPage = $book.find('.page-inner > .normal');
        $bookTitle = $book.find('.book-title');
        $bookProgressBar = $book.find('.book-progress .bar .inner');
        $toggleSummary.on('click', function (evt) {
            $book.toggleClass('with-summary');
            return evt.preventDefault();
        });
        const updateContributeUrl = href => {
            href = URI(href).relativeTo(URI(BookConfig.rootUrl + '/')).pathname();
            href = href.replace(/\.html$/, '.md');
            return $bookSummary.find('.edit-contribute > a').attr('href', "" + BookConfig.contributeUrl + "/" + href);
        };
        const renderToc = () => {
            let $summary, currentPagePath, key, _ref;
            $summary = $('<ul class="summary"></ul>');
            if (BookConfig.issuesUrl) {
                $summary.append("<li class='issues'><a target='_blank' href='" + BookConfig.issuesUrl + "'>Questions and Issues</a></li>");
            }
            if (BookConfig.contributeUrl) {
                $summary.append("<li class='edit-contribute'><a target='_blank' href='" + BookConfig.contributeUrl + "'>Edit and Contribute</a></li>");
            }
            $summary.append('<li class="divider"/>');
            $summary.append(tocHelper.$toc.children('li'));

            // Update the ToC to show which links have been visited
            // Add a "hidden" checkmark next to each item
            $summary.find('a[href]').parent().prepend('<i class="fa fa-check"></i>');
            for (key in JSON.parse(window.localStorage.visited)) {
                $summary.find("li:has(> a[href='" + key + "'])").addClass('visited');
            }
            $bookSummary.children('.summary').remove();
            $bookSummary.append($summary);
            currentPagePath = URI(window.location.href).pathname();
            if ((_ref = $bookSummary.find(".summary li:has(> a[href='" + currentPagePath + "'])").parent().parent()[0]) != null) {
                _ref.scrollIntoView();
            }
            renderNextPrev();
            return updateContributeUrl(currentPagePath);
        };
        const renderNextPrev = () => {
            // Update the progress bar
            let $nextPage, $prevPage, current, currentPageIndex, next, prev, totalPageCount;
            currentPageIndex = tocHelper._tocList.indexOf(window.location.href);
            totalPageCount = tocHelper._tocList.length;
            $bookProgressBar.width("" + (currentPageIndex * 100 / totalPageCount) + "%");
            $bookProgressBar.attr('title', "Reading Page " + currentPageIndex + " of " + totalPageCount);

            // Add next/prev buttons to the page
            $bookBody.children('.navigation').remove();
            current = removeTrailingSlash(window.location.href);
            prev = tocHelper.prevPageHref(current);
            next = tocHelper.nextPageHref(current);
            if (prev) {
                prev = URI(addTrailingSlash(prev)).relativeTo(URI(window.location.href)).toString();
                $prevPage = $("<a class='navigation navigation-prev' href='" + prev + "'><i class='fa fa-chevron-left'></i></a>");
                $bookBody.append($prevPage);
            }
            if (next) {
                next = URI(addTrailingSlash(next)).relativeTo(URI(window.location.href)).toString();
                $nextPage = $("<a class='navigation navigation-next' href='" + next + "'><i class='fa fa-chevron-right'></i></a>");
                return $bookBody.append($nextPage);
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
            let href;
            href = a.getAttribute('href');
            if (href) {
                href = href.replace(/\.md/, '.html');
                return a.setAttribute('href', href);
            }
        };
        const pageBeforeRender = ($els, href) => {
            let $all, $figure, $img, currentPagePath, el, id, img, selector, visited, _i, _j, _len, _len1, _ref, _ref1,
                _ref2;
            updateContributeUrl(href);
            _ref = $els.find('a[href]');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                el = _ref[_i];
                mdToHtmlFix(el);
            }
            // Convert `img[title]` tags into figures so they get numbered and titles are visible
            _ref1 = $els.find('img[title]');
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                img = _ref1[_j];
                $img = $(img);
                id = $img.attr('id');
                $img.removeAttr('id');
                $figure = $img.wrap('<figure>').parent();
                $figure.append("<figcaption>" + ($img.attr('title')) + "</figcaption>");
                if ($img.attr('data-title')) {
                    $figure.prepend("<div class='title'>" + ($img.attr('data-title')) + "</div>");
                }
                $figure.attr('id', id);
            }

            // From `webview/body.coffee`
            // Wrap title and content elements in header and section elements, respectively
            $els.find('.example, .exercise, .note').each(function (index, el) {
                let $contents, $el, $title;
                $el = $(el);
                $contents = $el.contents().filter(function (i, node) {
                    return !$(node).is('.title');
                });
                $contents.wrapAll('<section>');
                $title = $el.children('.title');
                $el.prepend($title);
                $title.wrap('<header>');
                // Add an attribute for the parents' `data-label`
                // since CSS does not support `parent(attr(data-label))`.
                // When the title exists, this attribute is added before it

                $title.attr('data-label-parent', $el.attr('data-label'));
                // Add a class for styling since CSS does not support `:has(> .title)`
                return $el.toggleClass('ui-has-child-title', $title.length > 0);
            });
            //# Wrap solutions in a div so "Show/Hide Solutions" work
            $els.find('.solution').wrapInner('<section class="ui-body">').prepend('<div class="ui-toggle-wrapper">\n  <button class="btn-link ui-toggle" title="Show/Hide Solution"></button>\n</div>');
            $els.on('click', '.ui-toggle', function (e) {
                let $solution;
                $solution = $(e.currentTarget).closest('.solution');
                return $solution.toggleClass('ui-solution-visible');
            });
            $els.find('figure:has(> figcaption)').addClass('ui-has-child-figcaption');

            //    Move all figure captions below the figure
            $els.find('figcaption').each(function (i, el) {
                return $(el).parent().append(el);
            });
            // Remember that this page has been visited
            currentPagePath = URI(href).pathname();
            visited = window.localStorage.visited && JSON.parse(window.localStorage.visited) || {};
            visited[currentPagePath] = new Date();
            window.localStorage.visited = JSON.stringify(visited);
            if ((_ref2 = $bookSummary.find(".summary li:has(> a[href='" + currentPagePath + "'])").addClass('visited').parent().parent()[0]) != null) {
                _ref2.scrollIntoView();
            }
            selector = 'h1, h2, h3, h4, h5, h6';
            $all = $els.filter(selector).add($els.find(selector));
            $all.each(function (i, el) {
                let $a, $el, icon;
                $el = $(el);
                id = $el.attr('id');
                if (id) {
                    icon = '<i class="fa fa-link"></i>';
                    $a = $('<a />').addClass('header-link').attr('href', '#' + id).html(icon);
                    return $el.prepend($a);
                }
            });
            if (typeof MathJax.startup !== "undefined" && MathJax.startup !== null) {
                MathJax.startup.promise = MathJax.startup.promise
                    .then(() => MathJax.typesetPromise($els))
                    .catch((err) => console.log('Typeset failed: ' + err.message));
                return MathJax.startup.promise;
            } else {
                return void 0;
            }
        };


        const tocHelper = new (TocHelper = (function () {
            function TocHelper() {
            }

            TocHelper.prototype._tocHref = null;

            TocHelper.prototype._tocList = [];

            TocHelper.prototype._tocTitles = {};

            TocHelper.prototype.loadToc = function (_tocHref, $toc, $title) {
                let $a, a, el, href, tocUrl, _i, _j, _len, _len1, _ref, _ref1;
                this._tocHref = _tocHref;
                this.$toc = $toc;
                this.$title = $title;
                tocUrl = URI(BookConfig.toc.url).absoluteTo(removeTrailingSlash(window.location.href));
                _ref = this.$toc.find('a[href]');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    el = _ref[_i];
                    mdToHtmlFix(el);
                    href = URI(el.getAttribute('href')).absoluteTo(tocUrl).pathname().toString();
                    el.setAttribute('href', href);
                }
                this._tocTitles = {};
                this._tocList = (function () {
                    let _j, _len1, _ref1, _results;
                    _ref1 = $toc.find('a[href]');
                    _results = [];
                    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                        el = _ref1[_j];
                        href = URI(el.getAttribute('href')).absoluteTo(tocUrl).toString();
                        this._tocTitles[href] = $(el).text();
                        _results.push(href);
                    }
                    return _results;
                }).call(this);
                if (BookConfig.serverAddsTrailingSlash) {
                    _ref1 = this.$toc.find('a');
                    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                        a = _ref1[_j];
                        $a = $(a);
                        href = $a.attr('href');
                        href = '../' + href;
                        $a.attr('href', href);
                    }
                }
                return renderToc();
            };

            //# HACK. Should use URIJS to convert path relative to toc file
            TocHelper.prototype._currentPageIndex = function (currentHref) {
                //#currentHref = currentHref.substring(0, currentHref.length - 1)  if "/" is currentHref[currentHref.length - 1]
                return this._tocList.indexOf(currentHref);
            };

            TocHelper.prototype.prevPageHref = function (currentHref) {
                let currentIndex;
                currentIndex = this._currentPageIndex(currentHref);
                return this._tocList[currentIndex - 1]; //# returns undefined if no previous page
            };

            TocHelper.prototype.nextPageHref = function (currentHref) {
                let currentIndex;
                currentIndex = this._currentPageIndex(currentHref);
                return this._tocList[currentIndex + 1]; // # returns undefined if no next page
            };

            return TocHelper;

        })());
        $.ajax({
            url: BookConfig.urlFixer(BookConfig.toc.url),
            headers: {
                'Accept': 'application/xhtml+xml'
            },
            dataType: 'html'
        }).then(function (html) {
            let $root, $title, $toc;
            $root = $('<div>' + html + '</div>');
            $toc = $root.find(BookConfig.toc.selector).first();
            if ($toc[0].tagName.toLowerCase() === 'ul') {
                //# HACK for collection HTML
                $title = $toc.children().first().contents();
                $toc = $toc.find('ul').first();
            } else {
                $title = $root.children('title').contents();
            }
            tocHelper.loadToc(BookConfig.toc.url, $toc, $title);
            return $bookTitle.html(tocHelper.$title);
        });
        //  # Fetch resources without fixing up their paths
        if (BookConfig.baseHref) {
            $book.find('base').remove();
            $book.prepend("<base href='" + BookConfig.baseHref + "'/>");
        }
        $originalPage = $('<div class="contents"></div>').append($originalPage);
        pageBeforeRender($originalPage, URI(window.location.href).pathname());
        $bookPage.append($originalPage);
        const changePage = (href) => {
            $book.addClass('loading');
            return $.ajax({
                url: BookConfig.urlFixer(href),
                headers: {
                    'Accept': 'application/xhtml+xml'
                },
                dataType: 'html'
            }).then(function (html) {
                //# Use `window.location.origin` to get around a <base href=""> pointing to another hostname
                let $html, $page;
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
                $html = $("<div>" + html + "</div>");
                $html.children('meta, link, script, title').remove();
                $bookPage.contents().remove();
                $page = $('<div class="contents"></div>').append($html.children());
                pageBeforeRender($page, href);
                $bookPage.append($page); // TODO: Strip out title and meta tags
                $book.removeClass('loading');
                //    # Scroll to top of page after loading
                return $('.body-inner').scrollTop(0);
            });
        };
        // control left and right
        $('body').on('keydown', evt => {
            let $link;
            switch (evt.which) {
                case 37:
                    $link = $('.book .navigation-prev');
                    break;
                case 39:
                    $link = $('.book .navigation-next');
                    break;
                default:
                    $link = null;
            }
        });
        //  # Listen to clicks and handle them without causing a page reload
        $('body').on('click', 'a[href]:not([href^="#"]):not([href^="https"])', function (evt) {
            let href;
            href = addTrailingSlash($(this).attr('href'));
            href = URI(href).absoluteTo(URI(window.location.href)).toString();
            changePage(href);
            return evt.preventDefault();
        });
    });

}).call(this);
