---
layout: null
---
// Service Worker for Physics Book PWA
const CACHE_VERSION = '2025-12-31-add-nopwa-debug-flag';
const CACHE_NAME = `physics-book-${CACHE_VERSION}`;
const BASE_URL = '{{ site.baseurl }}/';

console.log(`Service Worker: Version ${CACHE_VERSION}`);

// Core files that should always be cached
const CORE_CACHE_FILES = [
  `${BASE_URL}`,
  `${BASE_URL}index.html`,
  `${BASE_URL}assets/pwa/offline.html`,
  `${BASE_URL}SUMMARY.html`,
  `${BASE_URL}assets/css/book.css`,
  `${BASE_URL}assets/css/theme.css`,
  `${BASE_URL}assets/js/book-viewer.js`,
  `${BASE_URL}assets/js/math-config.js`,
  `${BASE_URL}assets/js/mathjax/tex-chtml.js`,
  `${BASE_URL}assets/js/book-config.js`,
  `${BASE_URL}assets/js/util.js`,
  `${BASE_URL}assets/js/search.js`,
  `${BASE_URL}assets/js/search-ui.js`,
  `${BASE_URL}assets/pwa/register-sw.js`,
  `${BASE_URL}assets/manifest/manifest.json`,
  `${BASE_URL}assets/icon/icon-192x192.png`,
  `${BASE_URL}assets/icon/icon-512x512.png`,
  `${BASE_URL}assets/image/cover2.png`,
  `${BASE_URL}assets/image/favicon.ico`,
  `${BASE_URL}search_index.json`,
];

// Fallback pages
const OFFLINE_PAGE = `${BASE_URL}assets/pwa/offline.html`;
const FALLBACK_PAGE = `${BASE_URL}index.html`;

// Install event - cache core files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching core files');
        return cache.addAll(CORE_CACHE_FILES);
      })
      .then(() => {
        console.log('Service Worker: Core files cached successfully');
        return self.skipWaiting(); // Force activation
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache core files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(name => {
            if (name !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', name);
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests (CDNs, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Cache First strategy for search index (for offline support)
  if (event.request.url.includes('search_index.json')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          console.log('Service Worker: Serving search index from cache');
          return cachedResponse;
        }
        // Fallback to network if not cached
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached version if available
      if (cachedResponse) {
        console.log('Service Worker: Serving from cache:', event.request.url);
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cache successful responses for future use
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          console.log('Service Worker: Network failed, trying offline fallback');

          // For navigation requests, return offline page
          if (
            event.request.destination === 'document' ||
            event.request.headers.get('Accept').includes('text/html')
          ) {
            // Try offline page first, then fallback page
            return caches
              .match(OFFLINE_PAGE)
              .then(response => response || caches.match(FALLBACK_PAGE));
          }

          // For other requests, just fail silently
          return new Response('Offline - Resource not available', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });
    })
  );
});
