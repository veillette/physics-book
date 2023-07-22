// Perform install steps
const cacheName = 'textbookCache';

// List the files to precache
let precacheResources = [
    '/',
    'assets/css/styles.css',
    'assets/css/gitbook.css',
    'assets/manifest/icons/icon-144x144.png',
    'assets/js/book-viewer.js',
    'assets/js/math-config.js'
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

// When there's an incoming fetch request, try to respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // Check if the request is for a module (HTML document)
    if (requestUrl.pathname.endsWith('.html')) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Fetch the requested resource from the network
                const fetchPromise = fetch(event.request).then((response) => {
                    // Cache the fetched resource
                    const clonedResponse = response.clone();
                    caches.open(cacheName).then((cache) => {
                        cache.put(event.request, clonedResponse);
                    });
                    return response;
                });

                // Dynamically fetch the URLs for the previous and next modules
                const prevModuleLink = document.querySelector('.book .navigation-prev');
                const nextModuleLink = document.querySelector('.book .navigation-next');
                const prefetchPromises = [];
                if (prevModuleLink) {
                    prefetchPromises.push(caches.match(prevModuleLink.href));
                }
                if (nextModuleLink) {
                    prefetchPromises.push(caches.match(nextModuleLink.href));
                }

                // Return the first available response (either from cache or network)
                return Promise.race([fetchPromise, ...prefetchPromises]);
            })
        );
    } else {
        // For non-module requests, use the default cache behavior
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
        );
    }
});
