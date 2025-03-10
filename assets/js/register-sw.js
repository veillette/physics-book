if (navigator.serviceWorker.controller) {
  console.log("Active service worker found");
} else if ("serviceWorker" in navigator) {
  // Check if we're on the GitHub Pages site
  const isGitHubPages = location.hostname === 'veillette.github.io';

  // For GitHub Pages, hardcode the full path to ensure correctness
  const workerPath = isGitHubPages
                     ? '/physics-book/serviceWorker.js'
                     : (location.pathname.includes('/physics-book/') ? '/physics-book/serviceWorker.js' : '/serviceWorker.js');

  const scopePath = isGitHubPages
                    ? '/physics-book/'
                    : (location.pathname.includes('/physics-book/') ? '/physics-book/' : '/');

  console.log(`Registering service worker at: ${workerPath} with scope: ${scopePath}`);

  navigator.serviceWorker.register(workerPath, {scope: scopePath}).then(
    (registration) => {
      console.log("Service worker registration succeeded:", registration);
    },
    (error) => {
      console.error(`Service worker registration failed: ${error}`);
    }
  );
} else {
  console.error("Service workers are not supported.");
}
