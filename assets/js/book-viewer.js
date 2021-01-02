// Generated by CoffeeScript 1.7.1
(function () {
    let BOOK_TEMPLATE, BookConfig, fa, _base, _base1, _base2;

    BookConfig = window.Book || {};

    if (BookConfig.includes == null) {
        BookConfig.includes = {};
    }

    if ((_base = BookConfig.includes).fontawesome == null) {
        _base.fontawesome = '//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css';
    }

    if (BookConfig.urlFixer == null) {
        BookConfig.urlFixer = function (val) {
            return val;
        };
    }

    if (BookConfig.toc == null) {
        BookConfig.toc = {};
    }

    if ((_base1 = BookConfig.toc).url == null) {
        _base1.url = '../toc';
    }

    if ((_base2 = BookConfig.toc).selector == null) {
        _base2.selector = 'nav, ol, ul';
    }

    if (BookConfig.baseHref == null) {
        BookConfig.baseHref = null;
    }

    if (BookConfig.serverAddsTrailingSlash == null) {
        BookConfig.serverAddsTrailingSlash = false;
    }

    if (BookConfig.searchIndex == null) {
        BookConfig.searchIndex = null;
    }

    if (BookConfig.contributeUrl == null) {
        BookConfig.contributeUrl = null;
    }

    BookConfig.rootUrl = BookConfig.rootUrl || '';

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
            $originalPage, $toggleSummary, TocHelper, addTrailingSlash, changePage, mdToHtmlFix,
            pageBeforeRender, removeTrailingSlash, renderNextPrev, renderToc, tocHelper, updateContributeUrl;
        $body = $('body');
        $originalPage = $body.contents();
        $body.contents().remove();
        $body.append(BOOK_TEMPLATE);
        $book = $body.find('.book');
        $toggleSummary = $book.find('.toggle-summary');
        $bookSummary = $book.find('.book-summary');
        $bookBody = $book.find('.book-body');
        $bookPage = $book.find('.page-inner > .normal');
        $bookTitle = $book.find('.book-title');
        $bookProgressBar = $book.find('.book-progress .bar .inner');
        $toggleSummary.on('click', function (evt) {
            if ($book.hasClass('with-summary')) {
                $book.removeClass('with-search');
            }
            $book.toggleClass('with-summary');
            return evt.preventDefault();
        });
        updateContributeUrl = function (href) {
            href = URI(href).relativeTo(URI(BookConfig.rootUrl + '/')).pathname();
            href = href.replace(/\.html$/, '.md');
            return $bookSummary.find('.edit-contribute > a').attr('href', "" + BookConfig.contributeUrl + "/" + href);
        };
        renderToc = function () {
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
        renderNextPrev = function () {
            let $nextPage, $prevPage, current, currentPageIndex, next, prev, totalPageCount;
            currentPageIndex = tocHelper._tocList.indexOf(window.location.href);
            totalPageCount = tocHelper._tocList.length;
            $bookProgressBar.width("" + (currentPageIndex * 100 / totalPageCount) + "%");
            $bookProgressBar.attr('title', "Reading Page " + currentPageIndex + " of " + totalPageCount);
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
        addTrailingSlash = function (href) {
            if (BookConfig.serverAddsTrailingSlash && href[href.length - 1] !== '/') {
                href += '/';
            }
            return href;
        };
        removeTrailingSlash = function (href) {
            if (BookConfig.serverAddsTrailingSlash && href[href.length - 1] === '/') {
                href = href.substring(0, href.length - 1);
            }
            return href;
        };
        mdToHtmlFix = function (a) {
            let href;
            href = a.getAttribute('href');
            if (href) {
                href = href.replace(/\.md$/, '.html');
                return a.setAttribute('href', href);
            }
        };
        pageBeforeRender = function ($els, href) {
            let $all, $figure, $img, currentPagePath, el, id, img, selector, visited, _i, _j, _len, _len1, _ref, _ref1,
                _ref2;
            updateContributeUrl(href);
            _ref = $els.find('a[href]');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                el = _ref[_i];
                mdToHtmlFix(el);
            }
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
                $title.attr('data-label-parent', $el.attr('data-label'));
                return $el.toggleClass('ui-has-child-title', $title.length > 0);
            });
            $els.find('.solution').wrapInner('<section class="ui-body">').prepend('<div class="ui-toggle-wrapper">\n  <button class="btn-link ui-toggle" title="Show/Hide Solution"></button>\n</div>');
            $els.on('click', '.ui-toggle', function (e) {
                let $solution;
                $solution = $(e.currentTarget).closest('.solution');
                return $solution.toggleClass('ui-solution-visible');
            });
            $els.find('figure:has(> figcaption)').addClass('ui-has-child-figcaption');
            $els.find('figcaption').each(function (i, el) {
                return $(el).parent().append(el);
            });
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


        tocHelper = new (TocHelper = (function () {
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

            TocHelper.prototype._currentPageIndex = function (currentHref) {
                return this._tocList.indexOf(currentHref);
            };

            TocHelper.prototype.prevPageHref = function (currentHref) {
                let currentIndex;
                currentIndex = this._currentPageIndex(currentHref);
                return this._tocList[currentIndex - 1];
            };

            TocHelper.prototype.nextPageHref = function (currentHref) {
                let currentIndex;
                currentIndex = this._currentPageIndex(currentHref);
                return this._tocList[currentIndex + 1];
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
                $title = $toc.children().first().contents();
                $toc = $toc.find('ul').first();
            } else {
                $title = $root.children('title').contents();
            }
            tocHelper.loadToc(BookConfig.toc.url, $toc, $title);
            return $bookTitle.html(tocHelper.$title);
        });
        if (BookConfig.baseHref) {
            $book.find('base').remove();
            $book.prepend("<base href='" + BookConfig.baseHref + "'/>");
        }
        $originalPage = $('<div class="contents"></div>').append($originalPage);
        pageBeforeRender($originalPage, URI(window.location.href).pathname());
        $bookPage.append($originalPage);
        changePage = function (href) {
            $book.addClass('loading');
            return $.ajax({
                url: BookConfig.urlFixer(href),
                headers: {
                    'Accept': 'application/xhtml+xml'
                },
                dataType: 'html'
            }).then(function (html) {
                let $html, $page;
                if (!/https?:\/\//.test(href)) {
                    href = "" + window.location.origin + href;
                }
                window.history.pushState(null, null, href);
                renderNextPrev();
                if (BookConfig.baseHref) {
                    $book.find('base').remove();
                    $book.prepend("<base href='" + (BookConfig.urlFixer(href)) + "'/>");
                }
                $html = $("<div>" + html + "</div>");
                $html.children('meta, link, script, title').remove();
                $bookPage.contents().remove();
                $page = $('<div class="contents"></div>').append($html.children());
                pageBeforeRender($page, href);
                $bookPage.append($page);
                $book.removeClass('loading');
                return $('.body-inner').scrollTop(0);
            });
        };
        $('body').on('keydown', function (evt) {
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
        $('body').on('click', 'a[href]:not([href^="#"]):not([href^="http"])', function (evt) {
            let href;
            href = addTrailingSlash($(this).attr('href'));
            href = URI(href).absoluteTo(URI(window.location.href)).toString();
            changePage(href);
            return evt.preventDefault();
        });
    });

}).call(this);
