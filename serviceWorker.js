// Perform install steps
const cacheName = 'textbookCache';

// Update precacheResources with correct paths
const baseUrl = self.location.href.includes('/physics-book/') ? '/physics-book/' : '/';
let precacheResources = [
  `${baseUrl}`,
  `${baseUrl}index.html`,
  `${baseUrl}assets/css/styles.css`,
  `${baseUrl}assets/css/gitbook.css`,
  `${baseUrl}assets/css/gitbook.css`,
  `${baseUrl}assets/manifest/icons/icon-144x144.png`,
  `${baseUrl}assets/js/book-viewer.js`,
  `${baseUrl}assets/js/math-config.js`,
  `${baseUrl}contents/`,
  `${baseUrl}resources/`,
  // Add more specific files rather than just directories
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('Opened cache');
                return Promise.all(
                    precacheResources.map(url => {
                        return fetch(url).then(response => cache.put(url, response));
                    })
                );
            })
    );
});

self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  // Allow immediate claiming of clients
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then(response => {
            // Cache new requests for future offline use
            if (response.ok && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(cacheName).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
          .catch(() => {
            // Return a fallback for HTML pages when offline
            if (event.request.url.match(/\.(html|htm)$/)) {
              return caches.match(`${baseUrl}index.html`);
            }
          });
      })
  );
});
