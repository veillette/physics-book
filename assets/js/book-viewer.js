import { BookConfig } from '../js/book-config.js';
import { removeTrailingSlash, addTrailingSlash, mdToHtmlFix } from '../js/util.js';

//# Inject the <link> tags for FontAwesome
if (BookConfig.includes.fontawesome) {
  const fa = document.createElement('link');
  fa.rel = 'stylesheet';
  fa.href = BookConfig.includes.fontawesome;
  document.head.appendChild(fa);
}

const BOOK_TEMPLATE = `<div class="book with-summary font-size-2 font-family-1">
        <a href="#" class="btn toggle-summary" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars"></i>
        </a>
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
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
    setTimeout(fn, 16);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

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
      checkmarkIcon.className = 'fa-solid fa-check';
      parentLi.insertBefore(checkmarkIcon, link);

      if (visitedLinks[href]) {
        parentLi.classList.add('visited');
      }
    });

    const currentPagePath = new URL(window.location.href).pathname;

    const currentPageLi = bookSummary.querySelector(
      ".summary li:has(> a[href='" + currentPagePath + "'])"
    );
    if (currentPageLi) {
      currentPageLi.parentNode.parentNode.scrollIntoView();
    }

    const existingSummary = bookSummary.querySelector('.summary');
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
      prevPage.innerHTML = "<i class='fa-solid fa-chevron-left'></i>";
      bookBody.appendChild(prevPage);
    }

    if (next) {
      next = new URL(addTrailingSlash(next), window.location.href).pathname;
      const nextPage = document.createElement('a');
      nextPage.className = 'navigation navigation-next';
      nextPage.href = next;
      nextPage.innerHTML = "<i class='fa-solid fa-chevron-right'></i>";
      bookBody.appendChild(nextPage);
    }

    renderPdfDownload();
    renderDarkModeToggle();
  };

  const renderDarkModeToggle = () => {
    // Remove existing dark mode toggle button
    const existingToggle = bookBody.querySelector('.dark-mode-toggle');
    if (existingToggle) {
      existingToggle.remove();
    }

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'dark-mode-toggle';
    toggleBtn.title = 'Toggle Dark Mode';
    toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');

    // Check if dark mode is already enabled from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      toggleBtn.innerHTML = "<i class='fa-solid fa-sun'></i>";
    } else {
      toggleBtn.innerHTML = "<i class='fa-solid fa-moon'></i>";
    }

    // Add click event listener to toggle dark mode
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');

      // Update localStorage
      if (isDarkMode) {
        localStorage.setItem('darkMode', 'enabled');
        toggleBtn.innerHTML = "<i class='fa-solid fa-sun'></i>";
      } else {
        localStorage.setItem('darkMode', 'disabled');
        toggleBtn.innerHTML = "<i class='fa-solid fa-moon'></i>";
      }
    });

    bookBody.appendChild(toggleBtn);
  };

  const renderPdfDownload = async () => {
    // Remove existing PDF download button
    const existingPdfBtn = bookBody.querySelector('.pdf-download-btn');
    if (existingPdfBtn) {
      existingPdfBtn.remove();
    }

    const currentPath = new URL(window.location.href).pathname;
    let pdfUrl = null;
    let pdfTitle = '';

    // Check if it's the preface or summary/intro page - link to complete book
    if (currentPath.includes('/preface.html') || currentPath.includes('/SUMMARY.html') || currentPath.includes('/index.html') || currentPath === BookConfig.baseHref || currentPath === BookConfig.baseHref + '/') {
      // Link to complete book PDF
      pdfUrl = BookConfig.baseHref + '/assets/pdf/complete-book.pdf';
      pdfTitle = 'Download Complete Book PDF';
    } else {
      // Try to extract chapter number from the path
      const chapterMatch = currentPath.match(/\/ch(\d+)/);
      if (chapterMatch) {
        const chapterNum = chapterMatch[1].padStart(2, '0');

        // Load summary.json to determine if this is a chapter intro or section
        try {
          const response = await fetch(BookConfig.baseHref + '/summary.json');
          const chapters = await response.json();

          // Find the matching chapter
          const chapter = chapters.find(c => c.chapterNumber === parseInt(chapterMatch[1]));
          if (chapter) {
            // Extract filename from path (remove .html, add .md)
            const pathParts = currentPath.split('/');
            const filename = pathParts[pathParts.length - 1].replace('.html', '.md');
            const fullPath = `contents/${filename}`;

            // Check if this is the chapter intro file
            if (chapter.chapterFile === fullPath) {
              // This is a chapter intro - link to complete chapter PDF
              pdfUrl = BookConfig.baseHref + `/assets/pdf/chapter-${chapterNum}-complete.pdf`;
              pdfTitle = `Download Chapter ${parseInt(chapterMatch[1])} PDF`;
            } else {
              // Check if it's a section
              const section = chapter.sections.find(s => s.sectionFile === fullPath);
              if (section) {
                const sectionNum = String(section.sectionNumber).padStart(2, '0');
                pdfUrl = BookConfig.baseHref + `/assets/pdf/chapter-${chapterNum}-section-${sectionNum}.pdf`;
                pdfTitle = `Download Section ${section.sectionNumber}: ${section.sectionTitle}`;
              } else {
                // Fallback to complete chapter PDF
                pdfUrl = BookConfig.baseHref + `/assets/pdf/chapter-${chapterNum}-complete.pdf`;
                pdfTitle = `Download Chapter ${parseInt(chapterMatch[1])} PDF`;
              }
            }
          }
        } catch (e) {
          // Fallback to complete chapter PDF if summary.json fails to load
          pdfUrl = BookConfig.baseHref + `/assets/pdf/chapter-${chapterNum}-complete.pdf`;
          pdfTitle = `Download Chapter ${parseInt(chapterMatch[1])} PDF`;
        }
      }
    }

    // Only add button if we have a PDF URL
    if (pdfUrl) {
      const pdfBtn = document.createElement('a');
      pdfBtn.className = 'pdf-download-btn';
      pdfBtn.href = pdfUrl;
      pdfBtn.title = pdfTitle;
      pdfBtn.setAttribute('aria-label', pdfTitle);
      pdfBtn.setAttribute('download', '');
      pdfBtn.innerHTML = "<i class='fa-solid fa-file-pdf'></i>";
      bookBody.appendChild(pdfBtn);
    }
  };

  /**
   *
   * @param {Element} els
   * @param {string} href
   */
  const newPageBeforeRender = (els, href) => {
    els.querySelectorAll('a[href]').forEach(el => {
      mdToHtmlFix(el);
    });

    els.querySelectorAll('img[title]').forEach(img => {
      const id = img.getAttribute('id');
      img.removeAttribute('id');
      const figure = document.createElement('figure');
      img.parentNode.insertBefore(figure, img);
      figure.appendChild(img);
      const caption = document.createElement('figcaption');
      // Get title and fix math delimiters
      let captionText = img.getAttribute('title');
      // Convert ( \theta... ) to \( \theta... \) for MathJax
      captionText = captionText.replace(/\(\s+\\/g, '\\(');
      captionText = captionText.replace(/\\\s+\)/g, '\\)');
      caption.innerHTML = captionText;
      figure.appendChild(caption);
      if (img.getAttribute('data-title')) {
        const title = document.createElement('div');
        title.className = 'title';
        let titleText = img.getAttribute('data-title');
        titleText = titleText.replace(/\(\s+\\/g, '\\(');
        titleText = titleText.replace(/\\\s+\)/g, '\\)');
        title.innerHTML = titleText;
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

      // Mark solution section to skip MathJax processing initially
      const solutionSection = solution.querySelector('section');
      if (solutionSection) {
        solutionSection.classList.add('mathjax-skip');
        solutionSection.setAttribute('data-math-typeset', 'false');
      }

      toggleButton.addEventListener('click', function (e) {
        const solution = e.currentTarget.closest('.solution');
        solution.classList.toggle('ui-solution-visible');

        // Typeset math when solution is first revealed
        const solutionSection = solution.querySelector('section');
        if (
          solutionSection &&
          solution.classList.contains('ui-solution-visible') &&
          solutionSection.getAttribute('data-math-typeset') === 'false'
        ) {
          solutionSection.setAttribute('data-math-typeset', 'true');
          solutionSection.classList.remove('mathjax-skip');
          typesetMathLazy(solutionSection);
        }
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

    const listItem = bookSummary.querySelector(
      ".summary li:has(> a[href='" + currentPagePath + "'])"
    );

    if (listItem !== null) {
      listItem.classList.add('visited');
      const parentElement = listItem.parentElement.parentElement;
      parentElement.scrollIntoView();
    }

    const selector = 'h1, h2, h3, h4, h5, h6';
    const all = Array.from(els.querySelectorAll(selector));
    all.forEach(function (el) {
      const id = el.getAttribute('id');
      if (id) {
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-link';
        const a = document.createElement('a');
        a.className = 'header-link';
        a.setAttribute('href', '#' + id);
        a.appendChild(icon);
        el.insertBefore(a, el.firstChild);
      }
    });
  };

  /**
   * Lazy typeset for a specific element (used for hidden content)
   * @param {Element} el - The element to typeset
   */
  const typesetMathLazy = el => {
    if (typeof MathJax !== 'undefined' && MathJax.startup && MathJax.startup.promise) {
      MathJax.startup.promise
        .then(() => MathJax.typesetPromise([el]))
        .catch(err => console.error('MathJax lazy typeset failed:', err.message));
    }
  };

  /**
   * Typeset MathJax content after element is in DOM
   * @param {Element} els - The element containing math to typeset
   * @param {boolean} clearFirst - Whether to clear previously typeset content
   */
  const typesetMath = (els, clearFirst = false) => {
    const doTypeset = () => {
      if (typeof MathJax !== 'undefined' && MathJax.startup && MathJax.startup.promise) {
        MathJax.startup.promise
          .then(() => {
            // Clear any previously typeset content if this is a page change
            if (clearFirst) {
              MathJax.typesetClear([els]);
            }
            // MathJax will automatically skip elements with 'mathjax-skip' class
            return MathJax.typesetPromise([els]);
          })
          .catch(err => console.error('MathJax typeset failed:', err.message));
      } else {
        setTimeout(doTypeset, 100);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(doTypeset);
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
      Accept: 'application/xhtml+xml',
    },
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
  // Typeset MathJax after content is in DOM
  typesetMath(altPage);

  /**
   *
   * @param {string} href
   * @returns {Promise<string>}
   */
  const changePage = href => {
    book.classList.add('loading');

    const requestPromise = fetch(BookConfig.urlFixer(href), {
      headers: {
        Accept: 'application/xhtml+xml',
      },
    }).then(response => response.text());

    return Promise.resolve(requestPromise).then(function (html) {
      //# Use `window.location.origin` to get around a <base href=""> pointing to another hostname
      if (!/https?:\/\//.test(href)) {
        href = '' + window.location.origin + href;
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
      htmlDivElement.querySelectorAll('meta, link, script').forEach(function (el) {
        el.remove();
      });

      bookPage.innerHTML = '';
      const altPage = document.createElement('div');
      altPage.className = 'contents';
      altPage.append(...htmlDivElement.childNodes);
      newPageBeforeRender(altPage, href);
      bookPage.append(altPage);
      // Typeset MathJax after content is in DOM (clear previous content)
      typesetMath(altPage, true);

      book.classList.remove('loading');

      //    # Scroll to top of the page after loading
      document.querySelector('.body-inner').scrollTop = 0;
    });
  };

  document.body.addEventListener('keydown', function (event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    let link;
    switch (key) {
      case 'ArrowLeft':
        // Left pressed
        link = document.querySelector('.book .navigation-prev');
        break;
      case 'ArrowRight':
        // Right pressed
        link = document.querySelector('.book .navigation-next');
        break;
      case 'ArrowUp':
        // Up pressed
        link = null;
        break;
      case 'ArrowDown':
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

  // Swipe navigation for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let isSwiping = false;

  const MIN_SWIPE_DISTANCE = 50; // minimum distance for a swipe (pixels)
  const MAX_VERTICAL_DISTANCE = 100; // maximum vertical movement allowed (pixels)
  const SWIPE_VELOCITY_THRESHOLD = 0.3; // minimum velocity (pixels/ms)

  bookBody.addEventListener('touchstart', function (event) {
    // Only track single-finger touches
    if (event.touches.length === 1) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      isSwiping = false;
    }
  }, { passive: true });

  bookBody.addEventListener('touchmove', function (event) {
    if (event.touches.length === 1) {
      touchEndX = event.touches[0].clientX;
      touchEndY = event.touches[0].clientY;

      const deltaX = Math.abs(touchEndX - touchStartX);
      const deltaY = Math.abs(touchEndY - touchStartY);

      // Detect horizontal swipe (more horizontal than vertical movement)
      if (deltaX > deltaY && deltaX > 10) {
        isSwiping = true;
        // Add visual feedback
        const swipeDistance = touchEndX - touchStartX;
        const pageWrapper = bookBody.querySelector('.page-wrapper');
        if (pageWrapper) {
          const transform = Math.max(-100, Math.min(100, swipeDistance * 0.2));
          pageWrapper.style.transition = 'none';
          pageWrapper.style.transform = `translateX(${transform}px)`;
          pageWrapper.style.opacity = 1 - Math.abs(transform) / 200;
        }
      }
    }
  }, { passive: true });

  bookBody.addEventListener('touchend', function (event) {
    if (isSwiping) {
      const swipeDistance = touchEndX - touchStartX;
      const verticalDistance = Math.abs(touchEndY - touchStartY);
      const timeElapsed = event.timeStamp - (event.timeStamp - 300); // approximate

      // Reset visual feedback
      const pageWrapper = bookBody.querySelector('.page-wrapper');
      if (pageWrapper) {
        pageWrapper.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        pageWrapper.style.transform = '';
        pageWrapper.style.opacity = '';
      }

      // Only navigate if swipe is primarily horizontal and meets minimum distance
      if (verticalDistance < MAX_VERTICAL_DISTANCE && Math.abs(swipeDistance) >= MIN_SWIPE_DISTANCE) {
        let link = null;

        if (swipeDistance > 0) {
          // Swipe right (go to previous page)
          link = document.querySelector('.book .navigation-prev');
        } else {
          // Swipe left (go to next page)
          link = document.querySelector('.book .navigation-next');
        }

        if (link !== null) {
          // Delay navigation slightly to allow visual feedback to complete
          setTimeout(() => {
            link.click();
          }, 100);
        }
      }

      isSwiping = false;
    }

    touchStartX = 0;
    touchStartY = 0;
    touchEndX = 0;
    touchEndY = 0;
  }, { passive: true });

  document.body.addEventListener('click', function (event) {
    let target = event.target;
    while (target && target.tagName !== 'A') {
      target = target.parentNode;
    }

    if (
      target &&
      target.getAttribute('href') &&
      !target.getAttribute('href').startsWith('#') &&
      !target.getAttribute('href').startsWith('https')
    ) {
      const href = target.getAttribute('href');

      // Open PDFs in new tab to use browser's PDF viewer
      if (/\.pdf$/i.test(href)) {
        event.preventDefault();
        window.open(href, '_blank');
        return;
      }

      // Don't intercept other file downloads (ZIP, etc.)
      const fileExtensions = /\.(zip|tar|gz|rar|7z|doc|docx|xls|xlsx|ppt|pptx)$/i;
      if (fileExtensions.test(href)) {
        // Let the browser handle file downloads normally
        return;
      }

      event.preventDefault();
      const hrefRelative = addTrailingSlash(href);
      const hrefAbsolute = new URL(hrefRelative, window.location.href).toString();
      changePage(hrefAbsolute);
    }
  });
}

docReady(parser);
