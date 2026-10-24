import { animatedFigureNames } from './animated-figure-names.js';

/** Offer the complete static view without running scripts inside SVG images. */
export function addFigureAnimationControls(root) {
  root.querySelectorAll('img[src]').forEach(img => {
    const source = img.getAttribute('src').split('#')[0];
    if (!animatedFigureNames.has(source.split('/').pop())) return;
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
