// Perform install steps
const cacheName = 'textbookCache';

// List the files to precache
let precacheResources = [
    '/',
    'assets/css/styles.css',
    'assets/css/gitbook.css',
    'assets/manifest/icons/icon-144x144.png',
    'assets/js/book-viewer.js',
    'assets/js/math-config.js',
    '/contents/', // Add URLs from directory1
    '/resources/',
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

self.addEventListener('activate', function (event) {
    const cacheWhitelist = ['random'];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});
