import { animatedFigureNames } from './animated-figure-names.js';

/** Offer the complete static view without running scripts inside SVG images. */
export function addFigureAnimationControls(root, pageUrl = window.location.href) {
  root.querySelectorAll('img[src]').forEach(img => {
    const rawSource = img.getAttribute('src').split('#')[0];
    if (!animatedFigureNames.has(rawSource.split('/').pop())) return;
    // The viewer changes <base>; resolve relative figure URLs against their page.
    const source = new URL(rawSource, new URL(pageUrl, window.location.href)).href;
    img.classList.add('figure-animated');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'figure-animation-toggle';
    let showingStatic = false;
    button.textContent = 'Show static figure';
    button.setAttribute('aria-label', `Show static figure: ${img.alt}`);
    button.setAttribute('aria-pressed', 'false');
    const fullSize = document.createElement('a');
    fullSize.href = source;
    fullSize.target = '_blank';
    fullSize.rel = 'noopener';
    fullSize.className = 'figure-animation-open';
    fullSize.textContent = 'Open full-size figure';
    button.addEventListener('click', () => {
      showingStatic = !showingStatic;
      img.src = showingStatic ? `${source}#animation-paused` : source;
      fullSize.href = img.src;
      const label = showingStatic ? 'Play animation' : 'Show static figure';
      button.textContent = label;
      button.setAttribute('aria-label', `${label}: ${img.alt}`);
      button.setAttribute('aria-pressed', String(showingStatic));
    });
    img.insertAdjacentElement('afterend', button);
    button.insertAdjacentElement('afterend', fullSize);
  });
}
